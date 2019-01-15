import { Element } from './addboard.styled'
import PropTypes from 'prop-types'
export default class AddBoard extends React.Component {
    state = {
        name: ''
    }
    onBtnClickHandler = e => {
        e.preventDefault()
        const { name } = this.state
        let obj = { name: name }
        
        let json = fetch('http://localhost:8080/api/board/check', {
            method: 'post',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: obj ? JSON.stringify(obj) : undefined
        })
            .then(resp => resp.json())
            .then(data => {
                let boardName = data.data.name
                let boardID = data.data.uid
                window.location.hash = boardID
                this.props.onAddBoard({
                    id: boardID,
                    name: boardName,
                    isExistBoard: true
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    handleChange = e => {
        const { id, value } = e.currentTarget
        this.setState({ [id]: value })
        console.log(111)
    }
    validate = () => {
        const { name } = this.state
        if (name.trim()) {
            return true
        }
        return false
    }
    render() {
        return (
            <Element>
                <form className="add">
                    <input
                        id="name"
                        type="text"
                        onChange={this.handleChange}
                        className="add__name"
                        placeholder="Имя доски"
                    />
                    <button className="add__btn" onClick={this.onBtnClickHandler} disabled={!this.validate()}>
                        Добавить доску
                    </button>
                </form>
               
            </Element>
        )
    }
}
AddBoard.propTypes = {
    onAddBoard: PropTypes.func.isRequired
}
