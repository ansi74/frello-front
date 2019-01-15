import { Element } from './board.styled'
import Columns from '../columns'
import AddBoard from '../addboard'
import PropTypes from 'prop-types'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            boardID: null,
            isExistBoard: false
        }
    }
    componentWillMount() {
        let boardUrl = window.location.hash.split('#')[1]
        if (boardUrl !== undefined) this.setState({ boardID: boardUrl, isExistBoard: true })
    }
    handleAddBoard = data => {
        this.setState({ isExistBoard: true })
    }
    render() {
        const { boardID, isExistBoard } = this.state

        if (isExistBoard) {
            return (
                <Element>
                    <Columns boardID={boardID} />
                </Element>
            )
        } else {
            return (
                <Element>
                    <AddBoard onAddBoard={this.handleAddBoard} />
                </Element>
            )
        }
    }
}
