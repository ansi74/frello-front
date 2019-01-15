import { Element } from './columns.styled'
import AddColumn from '../addcolumn'
import Column from '../column'
import openSocket from 'socket.io-client'
import Sortable from 'react-sortablejs'
import PropTypes from 'prop-types'

export default class Columns extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            elemID: null,
            isColumns: false,
            isLoading: false,
            boardID: null,
            data: [],
            columnsTmp: [],
            isExistColumns: false,
            socket: openSocket('http://localhost:8080/')
        }
    }

    columnUpdateCheck = () => {
        const { boardID } = this.props
        this.setState({ isLoading: true, boardID: boardID })
        let obj = { board: boardID }
        fetch('http://localhost:8080/api/column/list', {
            method: 'post',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: obj ? JSON.stringify(obj) : undefined
        })
            .then(resp => resp.json())
            .then(json => this.setState({ data: json, isLoading: false }))
    }

    componentDidMount() {
        this.columnUpdateCheck()
        this.listenColumnTransfer()
    }
    handleAddColumn = data => {
        this.columnUpdateCheck()
    }
    listenColumnTransfer = () => {
        this.state.socket.on(
            'columnTransfer',
            function(data) {
                //console.log(paren, this.state.itemOrder, data, divs)
                //this.onChange(this.state.itemOrder);
                if (!this.state.isDataChangedOnMove) {
                    const { boardID } = this.props

                    const paren = document.getElementById(boardID)
                    var divs = paren.children
                    if(data.fromIndex<data.toIndex){
                        divs[data.toIndex].after(divs[data.fromIndex])
                    }
                    else{
                        divs[data.toIndex].before(divs[data.fromIndex])
                    }
                    //id()
                   // divs[data.toIndex].before(divs[data.fromIndex])
                    
                }
            }.bind(this)
        )
    }
    render() {
        let columnTmp = null
        const { boardID, data, isLoading } = this.state
        let result = data.data

        if (typeof result !== 'undefined') {
            columnTmp = result.map(el => (
                <Column
                    onColumpUpdate={this.handleAddColumn}
                    columnID={el.id}
                    boardID={boardID}
                    key={el.id}
                    data={el}
                />
            ))
        }
        if (isLoading) {
            return <p>Загрузка ...</p>
        } else {
            return (
                <Element>
                    <AddColumn boardID={boardID} onAddColumn={this.handleAddColumn} />
                    <Sortable
                        className="panel-wrapper"
                        id={boardID}
                        options={{
                            animation: 150,
                            group: {
                                name: 'columns',
                                pull: true
                            },
                            store: {
                                // Получение сортировки (вызывается при инициализации)
                                get: function(sortable) {
                                    var order = localStorage.getItem(sortable.options.group)
                                    return order ? order.split('|') : []
                                },

                                // Сохранение сортировки (вызывается каждый раз при её изменении)
                                set: function(sortable) {
                                    var order = sortable.toArray()
                                    this.setState({
                                        itemOrder: order
                                    })
                                }.bind(this)
                            },
                            onEnd: function(evt) {
                                //console.log(evt)
                                this.setState({ isDataChangedOnMove: true })
                                let itemEl = evt.item
                                let obj = {
                                    board: { boardID },
                                    column: itemEl.id,
                                    fromIndex: evt.oldIndex,
                                    toIndex: evt.newIndex
                                }
                                obj.board = obj.board.boardID
                                //console.log(obj)
                                // /api/column/transfer
                                // board - uid доски
                                // column - id колонки которую перетаскиваешь
                                // fromIndex - позиция перетаскиваемой колонки
                                // toIndex - позиция куда перетаскиваем

                                let json = fetch('http://localhost:8080/api/column/transfer', {
                                    method: 'post',
                                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                                    body: obj ? JSON.stringify(obj) : undefined
                                }).then(() => this.setState({ isDataChangedOnMove: true }))
                            }.bind(this)
                        }}
                    >
                        {columnTmp}
                    </Sortable>
                </Element>
            )
        }
    }
}
