#!/usr/bin/env node
import axios from "axios";
import argParse from "minimist";
import {should, expect, assert} from "chai";
import * as fs from "fs";
import {join} from "path";

should();
const args = argParse((process.argv.slice(2)), {alias: {a: 'api', u: 'url',}})
const {log, error: err} = console
args.url = args.url || `http://localhost:4000`
args.should.have.property('api')
const requestUrl = `${args.url}${args.api}/${args.id || ''}`
;(async () => {
    log(`Request: GET ${requestUrl}`)
    const response = await axios.get(requestUrl)
    log(`Response status: ${response.status}`)
    log(`Response data: ${JSON.stringify(response.data, null, 3)}`)
})()