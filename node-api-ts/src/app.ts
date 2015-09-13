/// <reference path="typings/tsd.d.ts"/>

import {app} from './lib/server'
let port = +process.env.PORT || 80
app.listen(port)
