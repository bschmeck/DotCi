import React from 'react';
import BuildRow from './BuildRow.jsx';
require('./build_step.css');
export default React.createClass({
  render(){
    return <div className="pipeline-step">
      {this._isDownstreamBuild()? this._arrow() : <span/>}
      <div className="content">
        {this.props.detail?  <BuildRow key="build-row" build={this.props.build} compact/> : this._compact()} 
      </div>
    </div>
  },
  _compact(){
    return <div className={"summary ui button circular compact-"+this.props.build.get('result')} key="summary"  data-number={this.props.build.get('number')} onClick={this._onClick} >{this._dotCiStep()}</div>
  },
  _onClick(e){
    this.props.onClick(parseInt(e.target.getAttribute('data-number')));
  },
  _arrow(){
    return <iron-icon icon="arrow-forward"/>
  },
  _dotCiStep(){
    return  this._isDownstreamBuild() ? this.props.build.get('parameters').filter(param => param.get('name')==='DOTCI_STEP').get(0).get('value'): this.props.build.get('number');
  },
  _isDownstreamBuild(){
    return this.props.build.get('cause').get('name') === 'UPSTREAM';
  }
});
