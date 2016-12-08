/// <reference path="typings/index.d.ts"/>

import {app} from './api/server'
let port = +process.env.PORT || 8080
app.listen(port)