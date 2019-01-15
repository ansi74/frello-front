import { Element } from './addcolumn.styled'
import PropTypes from 'prop-types'

export default class AddColumn extends React.Component {
    state = {
        name: ''
    }
    onBtnClickHandler = e => {
        e.preventDefault()
        const { boardID } = this.props
        const { name } = this.state
        let obj = { board: boardID, name: name }
        let val = {
            isColumnCreate: true
        }
        let json = fetch('http://localhost:8080/api/column/add', {
            method: 'post',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: obj ? JSON.stringify(obj) : undefined
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ isColumnCreated: true })
                if (data.success) {
                    this.setState({ isColumnCreated: false })
                    this.props.onAddColumn(val)
                }
            })

        //.then(()=> )
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
        const { isColumnCreated } = this.state
        return (
            <Element>
                <form className="add">
                    <input
                        id="name"
                        type="text"
                        onChange={this.handleChange}
                        className="add__name"
                        placeholder="Имя столбца"
                    />
                    <button className="add__btn" onClick={this.onBtnClickHandler} disabled={!this.validate()}>
                        Добавить столбец
                    </button>
                </form>
                {isColumnCreated && <p className="error">Столбец с таким именем существует</p>}
            </Element>
        )
    }
}
AddColumn.propTypes = {
    onAddColumn: PropTypes.func.isRequired
}
