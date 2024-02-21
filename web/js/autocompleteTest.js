<<<<<<< HEAD
// import { app } from '../../../scripts/app.js';
// import { api } from '../../../scripts/api.js';
// import { $el } from '../../../scripts/ui.js';
// let promptList, CharacterP;

// var newDiv = document.createElement('div');
// newDiv.id = 'match-list';
// let matchList;

// app.registerExtension({
//   name: 'ComfyUI.ScenarioPrompt.autocompleteTest',
//   async setup() {
//     api
//       .fetchApi('/ludobico/autocompletetest')
//       .then((res) => {
//         const reader = res.body.getReader();

//         return reader.read();
//       })
//       .then(({ done, value }) => {
//         if (!done) {
//           const decoder = new TextDecoder('utf-8');
//           const decodedString = decoder.decode(value);
//           promptList = JSON.parse(decodedString);
//           console.log(promptList);
//         }
//       });
//   },
//   async nodeCreated(node, app) {
//     // console.log(node.widgets[0].name);
//     const searchPrompt = (searchText) => {
//       let matches = promptList.filter((p) => {
//         const regex = new RegExp(`^${searchText}`, 'gi');
//         return p.Character.match(regex);
//       });

//       if (searchText.length === 0) {
//         matches = [];
//         matchList.innerHTML = '';
//       }
//       if (matches.length === 0) {
//         matchList.innerHTML = '';
//       }

//       outputHtml(matches);
//     };
//     const outputHtml = (matches) => {
//       const textareaStyle = window.getComputedStyle(CharacterP);
//       const currentTop = parseFloat(textareaStyle.top.replace('px', ''));
//       const newTop = currentTop + 30;
//       if (matches.length > 0) {
//         const html = matches
//           .map((match) => {
//             const textareaStyle = window.getComputedStyle(CharacterP);
//             const matchHtml = `
//             <div style="
//               background-color: ${textareaStyle.backgroundColor};
//               border: ${textareaStyle.border};
//               padding: ${textareaStyle.padding};
//               width: ${textareaStyle.width};
//               height: ${textareaStyle.height};
//               position: ${textareaStyle.position};
//               top : ${newTop}px;
//               left : ${textareaStyle.left};
//               z-index: ${900};
//               " class="card-body mb-1">
//               <span>${match.Character}</span>
//             </div>`;
//             return matchHtml;
//           })
//           .join('');
//         matchList.innerHTML = html;
//       }
//     };
//     if (node.widgets && node.widgets[0].name === 'Base' && node.widgets[1].name === 'Character') {
//       CharacterP = document.querySelector('.comfy-multiline-input[placeholder="Character"]');
//       CharacterP.parentNode.insertBefore(newDiv, CharacterP.nextSibling);
//       matchList = document.getElementById('match-list');

//       CharacterP.addEventListener('input', () => searchPrompt(CharacterP.value));
//     }
//   },
// });
=======
import { app } from '../../../scripts/app.js';
import { api } from '../../../scripts/api.js';
import { $el } from '../../../scripts/ui.js';
let promptList, CharacterP;

var newDiv = document.createElement('div');
newDiv.id = 'match-list';
let matchList;

app.registerExtension({
  name: 'ComfyUI.ScenarioPrompt.autocomplete',
  async setup() {
    api
      .fetchApi('/ludobico/autocomplete')
      .then((res) => {
        const reader = res.body.getReader();

        return reader.read();
      })
      .then(({ done, value }) => {
        if (!done) {
          const decoder = new TextDecoder('utf-8');
          const decodedString = decoder.decode(value);
          promptList = JSON.parse(decodedString);
          console.log(promptList);
        }
      });
  },
  async nodeCreated(node, app) {
    // console.log(node.widgets[0].name);
    const searchPrompt = (searchText) => {
      let matches = promptList.filter((p) => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return p.Character.match(regex);
      });

      if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
      }
      if (matches.length === 0) {
        matchList.innerHTML = '';
      }

      outputHtml(matches);
    };
    const outputHtml = (matches) => {
      const textareaStyle = window.getComputedStyle(CharacterP);
      const currentTop = parseFloat(textareaStyle.top.replace('px', ''));
      const newTop = currentTop + 30;
      if (matches.length > 0) {
        const html = matches
          .map((match) => {
            const textareaStyle = window.getComputedStyle(CharacterP);
            const matchHtml = `
            <div style="
              background-color: ${textareaStyle.backgroundColor};
              border: ${textareaStyle.border};
              padding: ${textareaStyle.padding};
              width: ${textareaStyle.width};
              height: ${textareaStyle.height};
              position: ${textareaStyle.position};
              top : ${newTop}px;
              left : ${textareaStyle.left};
              z-index: ${900};
              " class="card-body mb-1">
              <span>${match.Character}</span>
            </div>`;
            return matchHtml;
          })
          .join('');
        matchList.innerHTML = html;
      }
    };
    if (node.widgets && node.widgets[0].name === 'Base' && node.widgets[1].name === 'Character') {
      CharacterP = document.querySelector('.comfy-multiline-input[placeholder="Character"]');
      CharacterP.parentNode.insertBefore(newDiv, CharacterP.nextSibling);
      matchList = document.getElementById('match-list');

      CharacterP.addEventListener('input', () => searchPrompt(CharacterP.value));
    }
  },
});
>>>>>>> 87642481bd5a1b03380785b8d7414597b14e6876
