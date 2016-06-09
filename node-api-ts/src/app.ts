/// <reference path="typings/index.d.ts"/>

import {app} from './api/server'
let port = +process.env.PORT || 80
app.listen(port)
