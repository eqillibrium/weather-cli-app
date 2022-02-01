#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан аргумент!')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Сохранено успешно!')
    } catch (e) {
        printError(e.message)
    }
}

const getForecast = async () => {
    try {
        const weather = await getWeather('moscow')
        console.log(weather)
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город')
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv)
    if(args.h) {
        printHelp()
    }
    if(args.t) {
        return saveToken(args.t)
    }
    await getForecast()
}

await initCLI()
