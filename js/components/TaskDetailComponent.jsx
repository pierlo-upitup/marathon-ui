/** @jsx React.DOM */

define([
  "React",
  "mixins/BackboneMixin",
], function(React, BackboneMixin) {

  return React.createClass({
    displayName: "TaskDetailComponent",
    mixins: [BackboneMixin],
    propTypes: {
      task: React.PropTypes.object.isRequired,
      onShowTaskList: React.PropTypes.func.isRequired
    },
    getResource: function() {
      return this.props.task;
    },
    handleShowTaskList: function (event) {
      event.preventDefault();
      this.props.onShowTaskList();
    },
    render: function() {
      var task = this.props.task;
      var healthClassSet = React.addons.classSet({
        "text-healthy": task.get("health"),
        "text-unhealthy": !task.get("health")
      });

      var statusClassSet = React.addons.classSet({
        "badge text-left": true,
        "badge-default": task.isStarted(),
        "badge-warning": task.isStaged()
      });

      var healthNodeList =
        task.get("healthCheckResults").map(function (cResult, index) {
          if (cResult) {
            var fSuccessNode = (cResult.firstSuccess == null ?
                <dd className="text-muted">None</dd> :
                <dd>
                  <time timestamp={cResult.firstSuccess}>
                    {new Date(cResult.firstSuccess).toLocaleString()}
                  </time>
                </dd>);
            var lSuccessNode = (cResult.lastSuccess == null ?
                <dd className="text-muted">None</dd> :
                <dd>
                  <time timestamp={cResult.lastSuccess}>
                    {new Date(cResult.lastSuccess).toLocaleString()}
                  </time>
                </dd>);
            var lFailureNode = (cResult.lastFailure == null ?
                <dd className="text-muted">None</dd> :
                <dd>
                  <time timestamp={cResult.lastFailure}>
                    {new Date(cResult.lastFailure).toLocaleString()}
                  </time>
                </dd>);
            var cFailuresNode = (cResult.consecutiveFailures == null ?
                <dd className="text-muted">None</dd> :
                <dd>{cResult.consecutiveFailures}</dd>);
            var aliveNode = (cResult.alive == null ?
                <dd>No</dd> :
                <dd>Yes</dd>);
            return <div key={index}>
                <p className="text-right text-muted">Health Check Result {index+1}</p>
                <dl className="dl-horizontal">
                  <dt>First Success</dt>
                  {fSuccessNode}
                  <dt>Last Success</dt>
                  {lSuccessNode}
                  <dt>Last Failure</dt>
                  {lFailureNode}
                  <dt>Consecutive Failures</dt>
                  {cFailuresNode}
                  <dt>Alive</dt>
                  {aliveNode}
                </dl>
                <hr />
              </div>;
            }
        });

      var stagedAtNode =
        (task.get("stagedAt") == null ?
          <dd className="text-muted">None</dd> :
          <dd>
              <time timestamp={task.get("stagedAt")}>
                {task.get("stagedAt").toLocaleString()}
              </time>
            </dd>);
      var startedAtNode =
        (task.get("startedAt") == null ?
          <dd className="text-muted">None</dd> :
          <dd>
              <time timestamp={task.get("startedAt")}>
                {task.get("startedAt").toLocaleString()}
              </time>
            </dd>);
      return (
        <div>
          <p>
          <ol class="breadcrumb">
            <li>
              <a href="#" class="active" onClick={this.handleShowTaskList}>
                Task List
              </a>
            </li>
            <li>{task.get("id")}</li>
          </ol>
          </p>
          <p className="text-right text-muted">Task Details</p>
          <dl className="dl-horizontal">
            <dt>Host</dt>
            <dd>{task.get("host")}</dd>
            <dt>Ports</dt>
            <dd>[{task.get("ports").toString()}]</dd>
            <dt>Status</dt>
            <dd>{task.get("status")}</dd>
            <dt>Staged at</dt>
            {stagedAtNode}
            <dt>Started at</dt>
            {startedAtNode}
            <dt>Version</dt>
            <dd>
              <time timestamp={task.get("version")}>
                {task.get("version").toLocaleString()}
              </time>
            </dd>
            <dt>Health</dt>
            <dd className={healthClassSet}>{task.get("healthMsg")}</dd>
          </dl>
          <hr />
          {healthNodeList}
        </div>
      );
    }

  });
});