# trello

npm i && cd frontend && npm i && cd ../backend && npm i && cd ../ && npm start



привет добавил api немного запросы на 8080 порт POST 
/api/board/check
{ board: String, name: String }
board - если указать, name не будет учитываться, то будет происходить поиск доски
name - если указать без board, то создастся доска

success
{"success":true,"data":{"uid":"jq3opaq9","name":"Trello","created":"2018-12-25T11:45:48.177Z"}}
error
{"success":false,"msg":"name_required"}

/api/column/add
{ board: String, name: String }
board - uid доски 
name - название колонки

success
{"success":true,"data":{"id":"jq6snqrc","name":"Success","nameLower":"success","point":3,"created":"2018-12-27T15:59:52.632Z"}}
error
{"success":false,"msg":"name_exists"}
{"success":false,"msg":"name_required"}
{"success":false,"msg":"board_does_not_exist"}
{"success":false,"msg":"unknown_error"}

/api/column/delete
{ board: String, column: String }
board - uid доски
column - id колонки

success
{"success":true,’data’:[columns]}
error
{"success":false,"msg":"column_required"}
{"success":false,"msg":"board_does_not_exist"}
{"success":false,"msg":"unknown_error"}

/api/column/edit
{ board: String, column: String, name: String }
board - uid доски
column - id колонки
name - новое название доски

success
{"success":true,"data":{"id":"jq6sy7mf","name":"SuccessNew","nameLower":"successnew","point":3,"created":"2018-12-27T16:08:01.046Z"}}

error
{"success":false,"msg":"name_exists"}
{"success":false,"msg":"name_required"}
{"success":false,"msg":"column_required"}
{"success":false,"msg":"board_does_not_exist"}
{"success":false,"msg":"unknown_error"}

/api/column/list
{ board: String }
board - uid доски

success
{"success":true,"data":[columns]}

error
{"success":false,"msg":"board_does_not_exist"}
{"success":false,"msg":"unknown_error"}


ивет
 
/api/card/add
{ board, column, name, text }
board - uid доски
column - id колонки
name - название карточки
text - описание карточки

Socket = cardAdd

success
{"success":true,"data":{"id":"jq6wby7m","column":"jq6wb3xd","name":"Название карточки","nameLower":"название карточки","text":"Описание карточки",history:[],"created":"2018-12-27T17:42:40.881Z"}}

error
{ success: false, msg: 'column_does_not_exist' }
{ success: false, msg: 'board_does_not_exist' }
{ success: false, msg: 'column_required' }
{ success: false, msg: 'name_required' }
{ success: false, msg: 'text_required' }
{ success: false, msg: 'unknown_error' }
{ success: false, msg: 'name_exists' }

/api/card/delete
{ board, column, card }
board - uid доски
column - id колонки
card - id карточки

Socket = cardDelete

success
{ success: true, data: [{ id, column, name, nameLower, text, history: [{ fromColumn, toColumn, fromIndex, toIndex, transfer }], created }] }
data - возвращает список всех карточек кроме удаленной 

error
{ success: false, msg: 'board_does_not_exist' }
{ success: false, msg: 'column_required' }
{ success: false, msg: 'card_required' }
{ success: false, msg: 'unknown_error' }

/api/card/edit
{ board, column, card, name, text }
board - uid доски
column - id колонки
card - id карточки
name - название карточки
text - описание карточки

Socket = cardEdit

success
{ success: true, data: [{ id, column, name, nameLower, text, history: [{ fromColumn, toColumn, fromIndex, toIndex, transfer }], created }] }

error
{ success: false, msg: 'column_does_not_exist' }
{ success: false, msg: 'board_does_not_exist' }
{ success: false, msg: 'column_required' }
{ success: false, msg: 'name_required' }
{ success: false, msg: 'text_required' }
{ success: false, msg: 'unknown_error' }

/api/card/list
{ board, column }
board - uid доски
column - id колонки

success
{ success: true, data: [{ id, column, name, nameLower, text, history: [{ fromColumn, toColumn, fromIndex, toIndex, transfer }], created }] }

error
{ success: false, msg: 'board_does_not_exist' }
{ success: false, msg: 'unknown_error' }

/api/card/transfer
board - uid доски
fromColumn - id колонки из которой берем карточку
toColumn - id колонки в которую переносим карточку
toId - id карточки
fromIndex - позиция карточки из колонки откуда берем
toIndex - позиция карточки из колонки куда переносим

Socket = cardTransfer

success
{ success: true, data: [{ id, column, name, nameLower, text, history: [{ fromColumn, toColumn, fromIndex, toIndex, transfer }], created }] }

error
{ success: false, msg: 'board_does_not_exist' }
{ success: false, msg: 'unknown_error' }