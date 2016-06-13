var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var ArtistCalendarItem = require('./ArtistCalendarItem.js');

function getAppState(){
	return {
		artistResults: AppStore.getArtistResults(),
		artistCalendars: AppStore.getArtistCalendars(),
		artistResultsPage: AppStore.getArtistResultsPage(),
		artistId: AppStore.getArtistId(),
		artistPage: AppStore.getArtistPage(),
		artist: AppStore.getArtist()
	}
};


var ArtistCalendar = React.createClass({
	render: function(){
		var artist = this.props.artist;
		var pages = [];
		if(Math.ceil(this.props.artistResultsPage.totalEntries/50)<2){
			pages = [];
		} else{
			for(i=1; i<=Math.ceil(this.props.artistResultsPage.totalEntries/50); i++){
				if(this.props.artistPage === i){
					var btnStatus = "page btn btn-xs btn-primary text-center active"
				} else {
					var btnStatus = "page btn btn-xs btn-default text-center"
				}
				pages.push(<a href="#" className={btnStatus} onClick={this.handlePage.bind(this, i)} value={i} key={i}>{i}</a>);
			}
		};
		if(this.props.artistPage === Math.ceil((this.props.artistResultsPage.totalEntries)/50)){
			var buttonClass = 'btn btn-sm btn-default disabled';
		} else{
			var buttonClass = 'btn btn-sm btn-default';
		};
		if(this.props.artistPage === 1){
			var prevButtonClass = 'btn btn-sm btn-default disabled';
		} else{
			var prevButtonClass = 'btn btn-sm btn-default';
		};

		if(this.props.artistCalendars != ''){
			var artistTable =
				<div>
					<div className="row nav-buttons">
						<div className="col-md-3">
							<a href="#" className={prevButtonClass} onClick={this.handleFirst}>&#60;&#60; First Page</a>
							<a href="#" className={prevButtonClass} onClick={this.handlePrevious}>&#60; Prev Page</a>
						</div>
						<div className="col-md-6 text-center">
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
							<th className="artist-header">Lineup</th>
							<th className="venue-header">Venue</th>
							<th className="location-header">Location</th>
							<th className="sk-link-header">Songkick Event Page</th>
						</tr>
					</thead>
						<tbody>
						{
							this.props.artistCalendars.map(function(artistCalendar, i){
							return (
								<ArtistCalendarItem artist={artist} artistCalendar={artistCalendar} key={i} />
							)
							})
						}
						</tbody>
					</table>
					<div className="row nav-buttons">
						<div className="col-md-3">
							<a href="#" className={prevButtonClass} onClick={this.handleFirst}>&#60;&#60; First Page</a>
							<a href="#" className={prevButtonClass} onClick={this.handlePrevious}>&#60; Prev Page</a>
						</div>
						<div className="col-md-6 text-center">
							{pages}
						</div>
						<div className="col-md-3">
							<a href="#" className={buttonClass} onClick={this.handleSubmit}>Next Page &#62;</a>
							<a href="#" className={buttonClass} onClick={this.handleLast}>Last Page &#62;&#62;</a>
						</div>
					</div>
				</div>
		} else{
			var artistTable = '';
		}
		return(
			<div>				
					{artistTable}
			</div>
		);
	},

	handleSubmit: function(){
		var page = this.props.artistPage;
		page++
		var search = {
			artistId: this.props.artistId,
			page: page
		};
		console.log(search);
		AppActions.searchArtistId(search);
	},

	handlePage: function(e){
		var page = e;
		var search = {
			artistId: this.props.artistId,
			page: page
		};
		AppActions.searchArtistId(search);
	},

	handleLast: function(){
		var page = Math.ceil(this.props.artistResultsPage.totalEntries/50);
		var search = {
			artistId: this.props.artistId,
			page: page
		};
		AppActions.searchArtistId(search);
	},

	handleFirst: function(){
		var page = 1;
		var search = {
			artistId: this.props.artistId,
			page: page
		};
		AppActions.searchArtistId(search);
	},

	handlePrevious: function(){
		var page = this.props.artistPage;
		page--;
		var search = {
			artistId: this.props.artistId,
			page: page
		};
		console.log(search);
		AppActions.searchArtistId(search);
	}
});

module.exports = ArtistCalendar;
