const envList = {
    DATABASE_URL: {required: true},
    JWT_SECRET: {required: true},
    CRYPTO_SALT: {required: true},
    ADMIN_DEFAULT_EMAIL: {required: false, default: 'admin@418team.com'},
    ADMIN_DEFAULT_PASSWORD: {required: false, default: 'admin'},
}

function envValidate() {
    let success = true;

    for (let env in envList) {
        let ec = process.env[env]
        if (!ec && envList[env].required) {
            console.error(`Не задана обязательная переменная ${env}`)
            success = false;
        } else if (!ec && !envList[env].required) {
            console.warn(`Не задана опциональная переменная ${env}. Используется значение по умолчанию: ${envList[env].default}`)
            if (envList[env].warning) console.warn(envList[env].warning)
            process.env[env] = envList[env].default
        }
    }

    if (!success) {
        console.error('Валидация переменных окружения не удалась! Проверьте файл .env.tpl и на его основе сделайте файл .env')
        process.exit(1)
    } else {
        console.log('Валидация переменных окружения пройдена успешно!')
    }
}

module.exports = envValidate();