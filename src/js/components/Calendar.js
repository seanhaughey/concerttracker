var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var CalendarItem = require('./CalendarItem.js');

function getAppState(){
	return {
		results: AppStore.getResults(),
		calendars: AppStore.getCalendars(),
		resultsPage: AppStore.getResultsPage(),
		areaId: AppStore.getAreaId(),
		page: AppStore.getPage(),
	}
};


var Calendar = React.createClass({

	render: function(){
		var pages = [];
		if(Math.ceil(this.props.resultsPage.totalEntries/50)<2){
			pages = [];
		} else{
			for(i=1; i<=Math.ceil(this.props.resultsPage.totalEntries/50); i++){
				pages.push(<a href="#" className='page btn btn-xs btn-default text-center' onClick={this.handlePage.bind(this, i)} value={i} key={i}>{i}</a>);
			}
		};
		if(this.props.page === Math.ceil(this.props.resultsPage.totalEntries/50)){
			var buttonClass = 'btn btn-sm btn-default disabled';
		} else{
			var buttonClass = 'btn btn-sm btn-default';
		};
		if(this.props.page === 1){
			var prevButtonClass = 'btn btn-sm btn-default disabled';
		} else{
			var prevButtonClass = 'btn btn-sm btn-default';
		};
		if(this.props.calendars != ''){
			var table =
				<div>
					<div className="row nav-buttons text-center">
						<div className="col-md-3">
							<a href="#" className={prevButtonClass} onClick={this.handleFirst}>&#60;&#60; First Page</a>
							<a href="#" className={prevButtonClass} onClick={this.handlePrevious}>&#60; Prev Page</a>
						</div>
						<div className="col-md-6">
						{pages}
						</div>
						<div className="col-md-3">
							<a href="#" className={buttonClass} onClick={this.handleSubmit}>Next Page &#62;</a>
							<a href="#" className={buttonClass} onClick={this.handleLast}>Last Page &#62;&#62;</a>
						</div>
					</div>
					<table className="table-striped">
						<thead>
							<tr>
								<th className="date-header">Date</th>
								<th className="artist-header">Headliner</th>
								<th className="venue-header">Venue</th>
								<th className="location-header">Location</th>
								<th className="sk-link-header">Songkick Event Page</th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.calendars.map(function(calendar, i){
									return (
										<CalendarItem calendar={calendar} key={i} />
									)
								})
							}
						</tbody>
					</table>
					<div className="row nav-buttons text-center">
						<div className="col-md-3">
							<a href="#" className={prevButtonClass} onClick={this.handleFirst}>&#60;&#60; First Page</a>
							<a href="#" className={prevButtonClass} onClick={this.handlePrevious}>&#60; Prev Page</a>
						</div>
						<div className="col-md-6">
						{pages}
						</div>
						<div className="col-md-3">
							<a href="#" className={buttonClass} onClick={this.handleSubmit}>Next Page &#62;</a>
							<a href="#" className={buttonClass} onClick={this.handleLast}>Last Page &#62;&#62;</a>
						</div>
					</div>
				</div>
		} else{
			var table = '';
		}
		return(
			<div>				
				{table}
			</div>
		);
	},

	handleSubmit: function(){
		var page = this.props.page;
		page++
		var search = {
			areaId: this.props.areaId,
			page: page
		};
		console.log(search);
		AppActions.searchId(search);
	},

	handlePage: function(e){
		var page = e;
		console.log(e);
		var search = {
			areaId: this.props.areaId,
			page: page
		};
		AppActions.searchId(search);
	},

	handleLast: function(){
		var page = Math.ceil(this.props.resultsPage.totalEntries/50);
		var search = {
			areaId: this.props.areaId,
			page: page
		};
		AppActions.searchId(search);
	},

	handleFirst: function(){
		var page = 1;
		var search = {
			areaId: this.props.areaId,
			page: page
		};
		AppActions.searchId(search);
	},

	handlePrevious: function(){
		var page = this.props.page;
		page--;
		var search = {
			areaId: this.props.areaId,
			page: page
		};
		console.log(search);
		AppActions.searchId(search);
	}
});

module.exports = Calendar;
