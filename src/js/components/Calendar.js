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
		page: AppStore.getPage()
	}
};


var Calendar = React.createClass({

	render: function(){
		if(this.props.page === Math.ceil(this.props.resultsPage.totalEntries/50)){
			var buttonClass = 'btn btn-xs btn-default disabled';
		} else{
			var buttonClass = 'btn btn-xs btn-default';
		};
		if(this.props.page === 1){
			var prevButtonClass = 'btn btn-xs btn-default disabled';
		} else{
			var prevButtonClass = 'btn btn-xs btn-default';
		};
		if(this.props.calendars != ''){
			var table =
				<div>
					<a href="#" className={prevButtonClass} onClick={this.handlePrevious}>Prev Page</a>
					<a href="#" className={buttonClass} onClick={this.handleSubmit}>Next Page</a>
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
					<a href="#" className={prevButtonClass} onClick={this.handlePrevious}>Prev Page</a>
					<a href="#" className={buttonClass} onClick={this.handleSubmit}>Next Page</a>
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
