import React from 'react/addons'; 
import events from '../events';

class ActionsMenuColumn extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			open: false
		};
	}

	_gotoQueue () {
		this._toggleMenu();
		window.location.hash = "/queue/" + this.props.queue;
	}

	_toggleMenu () {
		this.setState({
			open: !this.state.open
		});
	}

	_emptyQueue () {
		events.emit('queue-empty', this.props.queue);
		this._toggleMenu();
	}

	_pauseQueue () {
		events.emit('queue-pause', this.props.queue);
		this._toggleMenu();
	}

	_resumeQueue () {
		events.emit('queue-resume', this.props.queue);
		this._toggleMenu();
	}

	_kickOne () {
		events.emit('queue-kick-one', this.props.queue);
		this._toggleMenu();
	}

	_kickTen () {
		events.emit('queue-kick-ten', this.props.queue);
		this._toggleMenu();
	}

	_showPutForm () {
		events.emit('putform-show', this.props.queue);		
		this._toggleMenu();
	}

	render () {

		let menu;
		let pause_resume, kickOne, kickTen, showPutForm;

		if(this.props.stats.pause) {
			pause_resume = (
				<a onClick={this._resumeQueue.bind(this)} className="pure-menu-link">
					<i className="fa fa-play"></i>
					<span>Resume</span>
				</a>
			);
		} else {
			pause_resume = (
				<a onClick={this._pauseQueue.bind(this)} className="pure-menu-link">
					<i className="fa fa-pause"></i>
					<span>Pause</span>
				</a>
			);
		}

		kickOne = (
			<a onClick={this._kickOne.bind(this)} className="pure-menu-link">
				<i className="fa fa-forward"></i>
				<span>Kick 1</span>
			</a>
		);

		kickTen = (
			<a onClick={this._kickTen.bind(this)} className="pure-menu-link">
				<i className="fa fa-fast-forward"></i>
				<span>Kick 10</span>
			</a>
		);

		showPutForm = (
			<a onClick={this._showPutForm.bind(this)} className="pure-menu-link">
				<i className="fa fa-plus"></i>
				<span>Add Job</span>
			</a>
		);

		if(this.state.open) {
			menu = (
				<div className="pure-menu custom-actions-menu">
					<ul className="pure-menu-list">
						<li className="pure-menu-item">
							<a onClick={this._gotoQueue.bind(this)} className="pure-menu-link">
								<i className="fa fa-search"></i>
								<span>Details</span>
							</a>
						</li>
						<li className="pure-menu-item">
							<a onClick={this._emptyQueue.bind(this)} className="pure-menu-link">
								<i className="fa fa-trash"></i>
								<span>Delete all ready</span>
							</a>
						</li>
						<li className="pure-menu-item">
							{pause_resume}
						</li>
						<li className="pure-menu-item">
							{showPutForm}
						</li>
						<li className="pure-menu-item">
							{kickOne}
						</li>
						<li className="pure-menu-item">
							{kickTen}
						</li>
					</ul>
				</div>
			);
		}

		return (
			<td className="custom-actions">
				<div className="custom-actions-inner">
					<a onClick={this._toggleMenu.bind(this)} className="pure-button">
						<i className="fa fa-cog"></i>
						Actions
					</a>
					{menu}
				</div>
			</td>
		);
	}
};

export default ActionsMenuColumn;

