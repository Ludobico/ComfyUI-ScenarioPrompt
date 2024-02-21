import { app } from '../../../scripts/app.js';
import { api } from '../../../scripts/api.js';

let promptList;
let Character, Face, Body_type, Fashion, Accessory, Action;
let CharacterP, FaceP, Body_typeP, FashionP, AccessoryP, ActionP;
let matchList;
function createDiv(className) {
  var div = document.createElement('div');
  div.className = className;
  // div.id = `match-list-${className}`;
  div.id = `match-list`;
  return div;
}

var CharacterDiv = createDiv('Character');
var FaceDiv = createDiv('Face');
var Body_typeDiv = createDiv('Body_type');
var FashionDiv = createDiv('Fashion');
var AccessoryDiv = createDiv('Accessory');
var ActionDiv = createDiv('Action');

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
          Character = promptList['NovelAI - 태그[인물]'];
          Face = promptList['NovelAI - 태그[외모]'];
          Body_type = promptList['NovelAI - 태그[체형]'];
          Fashion = promptList['NovelAI - 태그[의상]'];
          Accessory = promptList['NovelAI - 태그[장신구]'];
          const Action1 = promptList['NovelAI - 태그[동작 1]'];
          const Action2 = promptList['NovelAI - 태그[동작 2]'];
          const Action3 = promptList['NovelAI - 태그[행동]'];
          Action = Action1.concat(Action2, Action3);
        }
      });
  },
  async nodeCreated(node, app) {
    const searchPrompt = (searchText, promptType, htmlType) => {
      let matches = promptType.filter((p) => {
        const regex = new RegExp(`^\\d*${searchText}`, 'gi');
        return p.tag.match(regex);
      });

      if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
      }
      if (matches.length === 0) {
        matchList.innerHTML = '';
      }

      outputHtml(matches, htmlType);
    };
    const outputHtml = (matches, htmlType) => {
      const textareaStyle = window.getComputedStyle(htmlType);
      const currentTop = parseFloat(textareaStyle.top.replace('px', ''));
      const newTop = currentTop + 30;
      if (matches.length > 0) {
        const html = matches
          .map((match) => {
            matchList.style.position = textareaStyle.position;
            matchList.style.top = newTop + 'px';
            matchList.style.left = textareaStyle.left;
            matchList.style.zIndex = 900;
            const matchHtml = `
            <div style="
              background-color: ${textareaStyle.backgroundColor};
              border: ${textareaStyle.border};
              padding: ${textareaStyle.padding};
              width: ${textareaStyle.width};
              height: ${textareaStyle.height};
              z-index: ${900};
              " class="card-body mb-1">
              <span>${match.tag}</span>
            </div>`;
            return matchHtml;
          })
          .join('');
        matchList.innerHTML = html;
      }
    };
    if (node.widgets && node.widgets[0].name === 'Base') {
      for (let i = 0; i < node.widgets.length - 1; i++) {
        if (node.widgets[i + 1].name === 'Character') {
          CharacterP = document.querySelector('.comfy-multiline-input[placeholder="Character"]');
          CharacterP.parentNode.insertBefore(CharacterDiv, CharacterP.nextSibling);
          matchList = document.getElementById('match-list');
          CharacterP.addEventListener('input', () => {
            searchPrompt(CharacterP.value, Character, CharacterP);
          });
        }
      }
    }
  },
});
