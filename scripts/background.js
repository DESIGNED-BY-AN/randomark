// Copyright 2023 Ngoc An Le (https://www.github.com/DESIGNED-BY-AN)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const URLPool = [];

// Search for all bookmarks descending from the given folder.
function fSearch(nodes, folderName, record) {
  if (nodes) {
    for (const node of nodes) {
      if (node.url && record) {
        URLPool.push(node.url);
      } else if (!node.url && node.title === folderName) {
        fSearch(node.children, folderName, true);
      } else {
        fSearch(node.children, folderName, record);
      }
    }
  }
}

// Launch one URL randomly from collected list upon user click.
// Target folder taken from extension settings page.
chrome.action.onClicked.addListener(async (tab) => {
  chrome.storage.sync
    .get({ folderName: "Bookmarks Bar" })
    .then((items) => items.folderName)
    .then((folderName) =>
      chrome.bookmarks.getTree().then((tree) => {
        fSearch(tree, folderName, folderName === "");
      })
    );

  const url = URLPool.at(Math.floor(Math.random() * URLPool.length));
  chrome.tabs.update({ url: url });
});
