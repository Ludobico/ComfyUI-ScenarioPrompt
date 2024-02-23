import { app } from '../../../scripts/app.js';
import { api } from '../../../scripts/api.js';

let promptList;
let Character, Face, Body_type, Fashion, Accessory, Action, Point_of_view, Background, Light;
let CharacterP, FaceP, Body_typeP, FashionP, AccessoryP, ActionP, Point_of_viewP, BackgroundP, LightP;
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
var Point_of_viewDiv = createDiv('Point_of_view');
var BackgroundDiv = createDiv('Background');
var LightDiv = createDiv('Light');

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
          Point_of_view = promptList['NovelAI - 태그[시점]'];
          Background = promptList['NovelAI - 태그[장소]'];
          Light = promptList['Lighting_prompt'];
        }
      });
  },
  async nodeCreated(node, app) {
    const searchPrompt = (searchText, promptType, htmlType) => {
      const searchWords = searchText.split(',');
      const lastWord = searchWords[searchWords.length - 1].trim();
      let matches = promptType.filter((p) => {
        // const regex = new RegExp(`^\\d*${searchText}`, 'gi');
        const regex = new RegExp(`.*${lastWord}.*`, 'gi');
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
      const CanvasHtml = document.querySelector('#graph-canvas');
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
              width: 250px;
              height: ${textareaStyle.height};
              z-index: ${900};
              " class="card-body">
              <span>${match.tag}</span>
            </div>`;
            return matchHtml;
          })
          .join('');
        matchList.innerHTML = html;
        const cardBodyList = document.querySelectorAll('.card-body');
        cardBodyList.forEach((cardBody) => {
          cardBody.addEventListener('mouseover', function () {
            this.style.backgroundColor = '#87CEFA';
          });
          cardBody.addEventListener('mouseout', function () {
            this.style.backgroundColor = textareaStyle.backgroundColor;
          });
          cardBody.addEventListener('click', function (e) {
            const words = htmlType.value.split(',');
            const lastWord = words.pop();
            const newWords = words.filter((word) => word !== lastWord);
            newWords.push(e.target.innerText.trim());
            htmlType.value = newWords.join(',') + ',';
            matchList.innerHTML = '';
          });
        });
        CanvasHtml.addEventListener('click', function () {
          matchList.innerHTML = '';
        });
      }
    };
    /*
    I hardcoded it because this function wasn't working.


    function setupWidget(widgetName, widgetDiv, placeholderText, widgetData) {
  const widgetP = document.querySelector(`.comfy-multiline-input[placeholder="${placeholderText}"]`);
  widgetP.parentNode.insertBefore(widgetDiv, widgetP.nextSibling);
  matchList = document.getElementById('match-list');
  widgetP.addEventListener('input', () => {
    searchPrompt(widgetP.value, widgetData, widgetP);
  });
}
    */
    if (node.widgets && node.widgets[0].name === 'Base') {
      for (let i = 1; i < node.widgets.length; i++) {
        if (node.widgets[i].name === 'Character') {
          CharacterP = document.querySelector('.comfy-multiline-input[placeholder="Character"]');
          CharacterP.parentNode.insertBefore(CharacterDiv, CharacterP.nextSibling);
          matchList = document.getElementById('match-list');
          CharacterP.addEventListener('input', () => {
            searchPrompt(CharacterP.value, Character, CharacterP);
          });
        } else if (node.widgets[i].name === 'Face') {
          FaceP = document.querySelector('.comfy-multiline-input[placeholder="Face"]');
          FaceP.parentNode.insertBefore(FaceDiv, FaceP.nextSibling);
          matchList = document.getElementById('match-list');
          FaceP.addEventListener('input', () => {
            searchPrompt(FaceP.value, Face, FaceP);
          });
        } else if (node.widgets[i].name === 'Body_type') {
          Body_typeP = document.querySelector('.comfy-multiline-input[placeholder="Body_type"]');
          Body_typeP.parentNode.insertBefore(Body_typeDiv, Body_typeP.nextSibling);
          matchList = document.getElementById('match-list');
          Body_typeP.addEventListener('input', () => {
            searchPrompt(Body_typeP.value, Body_type, Body_typeP);
          });
        } else if (node.widgets[i].name === 'Fashion') {
          FashionP = document.querySelector('.comfy-multiline-input[placeholder="Fashion"]');
          FashionP.parentNode.insertBefore(FashionDiv, FashionP.nextSibling);
          matchList = document.getElementById('match-list');
          FashionP.addEventListener('input', () => {
            searchPrompt(FashionP.value, Fashion, FashionP);
          });
        } else if (node.widgets[i].name === 'Accessory') {
          AccessoryP = document.querySelector('.comfy-multiline-input[placeholder="Accessory"]');
          AccessoryP.parentNode.insertBefore(AccessoryDiv, AccessoryP.nextSibling);
          matchList = document.getElementById('match-list');
          AccessoryP.addEventListener('input', () => {
            searchPrompt(AccessoryP.value, Accessory, AccessoryP);
          });
        } else if (node.widgets[i].name === 'Action') {
          ActionP = document.querySelector('.comfy-multiline-input[placeholder="Action"]');
          ActionP.parentNode.insertBefore(ActionDiv, ActionP.nextSibling);
          matchList = document.getElementById('match-list');
          ActionP.addEventListener('input', () => {
            searchPrompt(ActionP.value, Action, ActionP);
          });
        } else if (node.widgets[i].name === 'Point_of_view') {
          Point_of_viewP = document.querySelector('.comfy-multiline-input[placeholder="Point_of_view"]');
          Point_of_viewP.parentNode.insertBefore(Point_of_viewDiv, Point_of_viewP.nextSibling);
          matchList = document.getElementById('match-list');
          Point_of_viewP.addEventListener('input', () => {
            searchPrompt(Point_of_viewP.value, Point_of_view, Point_of_viewP);
          });
        } else if (node.widgets[i].name === 'Background') {
          BackgroundP = document.querySelector('.comfy-multiline-input[placeholder="Background"]');
          BackgroundP.parentNode.insertBefore(BackgroundDiv, BackgroundP.nextSibling);
          matchList = document.getElementById('match-list');
          BackgroundP.addEventListener('input', () => {
            searchPrompt(BackgroundP.value, Background, BackgroundP);
          });
        } else if (node.widgets[i].name === 'Light') {
          LightP = document.querySelector('.comfy-multiline-input[placeholder="Light"]');
          LightP.parentNode.insertBefore(LightDiv, LightP.nextSibling);
          matchList = document.getElementById('match-list');
          LightP.addEventListener('input', () => {
            searchPrompt(LightP.value, Light, LightP);
          });
        }
      }
    }
  },
});
