# Runtime Stylesheet

Parse vanilla-extract styles in runtime. Use it only for testing purposes - For production, use vanilla-extract 🙂. 

## Usage

Install the package:

```sh
pnpm add runtime-stylesheet
```

Start styling

```ts
import { Stylesheet } from 'runtime-stylesheet'

function Example(){
  return (
    <>
      <div className="container">content</div>
      <RuntimeStylesheet css={{ container: { background: '#000' } }} />
     </>
  )
}
```
