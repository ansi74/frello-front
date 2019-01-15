import { Element } from './column.styled'
import Card from '../card'
import AddCard from '../addcard'
import PropTypes from 'prop-types'
import Sortable from 'react-sortablejs'
import openSocket from 'socket.io-client'
export default class Column extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            elemID: null,
            isColumns: false,
            isLoading: false,
            isDataChangedOnMove: false,
            dataCards: [],
            columnsTmp: [],
            tmpData: null,
            movedData: null,
            socket: openSocket('http://localhost:8080/')
        }
    }
    addCard = () => {
        const { boardID, columnID } = this.props
        let obj = { board: boardID, column: columnID }
        let json = fetch('http://localhost:8080/api/card/list', {
            method: 'post',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: obj ? JSON.stringify(obj) : undefined
        })
            .then(resp => resp.json())
            .then(json => this.setState({ dataCards: json, isLoading: false }))
    }

    socketFunct = () => {
        this.state.socket.on(
            'cardTransfer',
            function() {
                if (!this.state.isDataChangedOnMove) {
                    this.addCard()
                }
            }.bind(this)
        )
        this.state.socket.on(
            'cardAdd',
            function() {
                if (!this.state.isDataChangedOnMove) {
                    this.addCard()
                }
            }.bind(this)
        )
        this.state.socket.on(
            'cardDelete',
            function() {
                if (!this.state.isDataChangedOnMove) {
                    this.addCard()
                }
            }.bind(this)
        )
        
    }

    componentDidMount() {
        this.addCard()
        this.socketFunct()
    }
    handleAddCard = () => {
        this.addCard()
    }

    render() {
        //let timer=setTimeout(this.addCard(),5000)
        
        let cardTmp = null
        const { name } = this.props.data
        const { boardID, columnID } = this.props
        const { dataCards, isLoading } = this.state
        let cards = dataCards.data
        if (typeof cards !== 'undefined') {
            cardTmp = cards.map(elem => <Card key={elem.id} boardID={boardID} columnID={columnID} data={elem} />)
        }
        if (isLoading) {
            return <p>Загрузка ...</p>
        } else {
            return (
                <Element key={columnID} id={columnID} data-id={columnID}>
                    <div className="panel">
                        <div className="panel__header">{name}</div>
                        <AddCard boardID={boardID} columnID={columnID} onAddCard={this.handleAddCard} />
                        <Sortable
                            className="panel__items"
                            id={columnID}
                            options={{
                                animation: 150,
                                group: {
                                    name: 'shared',
                                    pull: true,
                                    put: true
                                },
                                onChoose: function() {
                                    this.setState({ isDataChangedOnMove: true })
                                }.bind(this),
                                onAdd: function(evt) {
                                    this.setState({ isDataChangedOnMove: true })
                                    console.log(evt)
                                    let itemEl = evt.item
                                    let obj = {
                                        board: { boardID },
                                        fromColumn: evt.from.id,
                                        toColumn: evt.to.id,
                                        toId: itemEl.id,
                                        fromIndex: evt.oldIndex,
                                        toIndex: evt.newIndex
                                    }
                                    obj.board = obj.board.boardID
                                    let json = fetch('http://localhost:8080/api/card/transfer', {
                                        method: 'post',
                                        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                                        body: obj ? JSON.stringify(obj) : undefined
                                    }).then(() => this.setState({ isDataChangedOnMove: true }))
                                }.bind(this)
                            }}
                        >
                            {cardTmp}
                        </Sortable>
                    </div>
                </Element>
            )
        }
    }
}
Column.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    onColumpUpdate: PropTypes.func
}
