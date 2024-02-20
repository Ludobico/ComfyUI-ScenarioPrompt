import { app } from '../../../scripts/app.js';
import { api } from '../../../scripts/api.js';

app.registerExtension({
  name: 'ComfyUI.ScenarioPrompt',
  async setup() {
    // api
    //   .fetchApi('/ludobico/autocomplete')
    //   .then((res) => {
    //     const reader = res.body.getReader();
    //     return reader.read();
    //   })
    //   .then(({ done, value }) => {
    //     if (!done) {
    //       const decoder = new TextDecoder('utf-8');
    //       const decodedString = decoder.decode(value);
    //       console.log(decodedString);
    //     }
    //   });
  },
});
