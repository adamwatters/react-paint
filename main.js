/** @jsx React.DOM */
var SizeInput = React.createClass({

	handleSubmit: function(event) {
		event.preventDefault();
		newCanvSize = {
			width: this.refs.widthIn.getDOMNode().value,
			height: this.refs.heightIn.getDOMNode().value
		};
		this.props.resizeCanv(newCanvSize);
	},

	render: function() {
		return (
			<form>
				<input ref='widthIn' type='text'>WIDTH</input>
				<input ref='heightIn' type='text'>HEIGHT</input>
				<button onClick={this.handleSubmit} type='submit'>resize</button>
			</form>
		);
	}
});

var Codel = React.createClass({

	getInitialState: function() {
		return (
			{
				key: 0,
				color: 'black'
			}
		);
	},

	render: function() {
		return (
			<div className="codel"></div>
		);
	}
});

var CodelRow = React.createClass({

	getInitialState: function() {
		return (
			{
				xKeySetter: 0,
			}
		);
	},

	render: function() {
		var row = [];
		for(i=0; i<this.props.canvSize.width; i++){
			row = row.concat(<Codel />);
		};
		return (
			<div className="codel-row">
				{row}
			</div>
		);
	}
});

var CodelCanv = React.createClass({

	getInitialState: function() {
		return (
			{
				yKeySetter: 0,
			}
		);
	},

	render: function() {

		var canv = [];
		for(i=0; i<this.props.canvSize.height; i++){
			canv = canv.concat(<CodelRow key={i} canvSize={this.props.canvSize} />);
		};
		return (
			<div className="codel-canv">
				{canv}
			</div>
		);
	}
});

var PaintJar = React.createClass({

	handleSubmit: function(event) {
		event.preventDefault();
		console.log(this.props.brushColor);
		//TODO: ACCEPT NEW BRUSH COLOR
	},

	render: function() {
		return(
			<div className='paint-jar' onClick={this.handleSubmit}></div>
		);
	}
});

var Palette = React.createClass({

	render: function() {
		return (
			<div className='palette'>
				<PaintJar brushColor={this.props.brushColor} />
				<PaintJar />
			</div>
		); 
	}
});

var Studio = React.createClass({

	getInitialState: function() {
		return (
			{
				canvSize: {width:20, height:20},
				codelSize: {width:'10px', height:'10px'},
				brushColor: 'black'
			}
		);
	},

	resizeCanv: function(entry) {
		this.setState({
			canvSize: entry
		});
	},

	changeBrushColor: function(entry) {
		this.setState({
			brushColor: entry
		}); 
	},

	render: function() {

		console.log(this.state.brushColor);
  		return (
  			<div>
  				<div>
  					<SizeInput resizeCanv={this.resizeCanv} />
  					<Palette brushColor={this.state.brushColor}/>
  				</div>
      			<CodelCanv canvSize={this.state.canvSize} />
      		</div>
    	);
  	}
});

React.renderComponent(
  	<Studio />,
  	document.getElementById('content')
);

