const user = 'cs3219'
const password = 'cs3219'
export const db_name = 'taskB'
export const uri = db_name => `mongodb+srv://${user}:${password}@taskb.te7my.mongodb.net/${db_name}?retryWrites=true&w=majority`
