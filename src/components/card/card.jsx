import { Element } from './card.styled';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
	state = {
		board: '',
		fromColumn: '',
		toId: ''
	};
	handleRemoveCard = (e) => {
		const { id } = this.props.data;
		const { boardID, columnID } = this.props;
		let obj = { board: boardID, column: columnID, card: id };
		let element = document.getElementById(id);
		element.parentNode.removeChild(element);
		fetch('http://localhost:8080/api/card/delete', {
			method: 'post',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: obj ? JSON.stringify(obj) : undefined
		});
	};
	render() {
		const { id, name, text } = this.props.data;
		const { boardID, columnID } = this.props;
		return (
			<div key={id} className="item" id={id} board={boardID} from={columnID}>
				<div className="item__header">{name}</div>
				<div className="item__body">{text}</div>
				<div className="item__footer g-clear">
					<a className="item__edit">&#9998;</a>
					<a className="item__remove" onClick={this.handleRemoveCard.bind(this)}>
						&times;
					</a>
				</div>
			</div>
		);
	}
}
Card.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string.isRequired, // добавили id, это число, обязательно
		name: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	}),
	columnID: PropTypes.string.isRequired
};
