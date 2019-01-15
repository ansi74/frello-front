import { Element } from './addcard.styled'
import PropTypes from 'prop-types'

export default class AddCard extends React.Component {
    state = {
        name: '',
        text: '',
        visible: false,
        btnText: '+'
    }
    onBtnClickHandler = e => {
        e.preventDefault()
        const { boardID, columnID } = this.props
        const { name, text } = this.state
        let obj = { board: boardID, column: columnID, name: name, text: text }
        let val = {
            isCardCreate: true
        }
        fetch('http://localhost:8080/api/card/add', {
            method: 'post',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: obj ? JSON.stringify(obj) : undefined
        })
            .then(resp => resp.json())
            .then(data => {
                let msg = data.msg
                let alert = ''
                switch (msg) {
                    case 'column_does_not_exist':
                        alert = 'Колонка не существует'
                        break
                    case 'board_does_not_exist':
                        alert = 'Доска не существует'
                        break
                    case 'column_required':
                        alert = 'Колонка не определена'
                        break
                    case 'name_required':
                        alert = 'Поле имя обязательно'
                        break
                    case 'text_required':
                        alert = 'Поле текст обязательно'
                        break
                    case 'unknown_error':
                        alert = 'Колонка не существует'
                        break
                    case 'name_exists':
                        alert = 'Поле имя должно быть уникальным'
                        break
                }
                this.setState({ isCardCreated: true, alert: alert })
                if (data.success) {
                    this.setState({visible:false,btnText:'+'})
                    this.props.onAddCard(val)
                }

                //this.props.onAddCard(val)
            })
    }
    handleChange = e => {
        const { id, value } = e.currentTarget
        this.setState({ [id]: value })
    }
    validate = () => {
        const { name, text } = this.state
        if (name.trim() && text.trim()) {
            return true
        }
        return false
    }
    handleShowForm = e => {
        e.preventDefault()
        console.log()
        this.setState({ btnText: this.state.visible ? '+' : '-' })
        this.setState({ visible: this.state.visible ? false : true })
    }
    render() {
        const { visible, btnText, alert, isCardCreated } = this.state
        const { columnID } = this.props
        return (
            <Element>
                <a className="show_form" onClick={this.handleShowForm.bind(this)}>
                    {btnText}
                </a>
                {visible && (
                    <form className="add" name="addCard">
                        <input
                            id="name"
                            type="text"
                            onChange={this.handleChange}
                            className="add__name"
                            placeholder="Имя карточки"
                        />
                        <textarea
                            id="text"
                            onChange={this.handleChange}
                            className="add__text"
                            placeholder="Текст новости"
                        />
                        <button
                            className="add__btn"
                            onClick={this.onBtnClickHandler.bind(this)}
                            disabled={!this.validate()}
                        >
                            Добавить задачу
                        </button>
                    </form>
                )}
                {isCardCreated && <p className="error">{alert}</p>}
            </Element>
        )
    }
}
AddCard.propTypes = {
    onAddCard: PropTypes.func.isRequired
}
