./src/modules/products/listHead/index.tsx
Attempted import error: 'importProducts' is not exported from '../actions'.

And created a function for that please check,

./src/modules/apps/appDetails/index.tsx
Module not found: Can't resolve 'src/apps' in 'C:\Websites\Cezerin\cezerin2-admin\src\modules\apps\appDetails'

Changed to,

import apps from "../../../apps"
and this to,
./src/modules/apps/services/components/list.tsx
Module not found: Can't resolve 'src/apps' in 'C:\Websites\Cezerin\cezerin2-admin\src\modules\apps\services\components'
