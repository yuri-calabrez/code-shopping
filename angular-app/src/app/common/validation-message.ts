const messages = {
    required: 'O campo :name é requerido',
    minlength: 'O campo : name precisa ter no mínimo :min caracteres',
    maxlength: 'O campo : name precisa ter no máximo :max caracteres',
    email: 'O campo :name não é um e-mail válido'
}

export class ValidationMessage {
    static getMessage(error: string, replaceTokens: Array<any>) {
        let message = messages[error]
        const tokens = message.match(/\:[a-z]+/g)
        tokens.forEach((token, index) => message = message.replace(token, replaceTokens[index]))
        return message
    }
}