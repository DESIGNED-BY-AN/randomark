const saveOptions = () => {
  const folderName = document.getElementById("folderName").value;
  chrome.storage.sync.set(
    {
      folderName: folderName,
    },
    () => {
      const status = document.getElementById("status");
      status.textContent = "Option saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 1500);
    }
  );
};

const restoreOptions = () => {
  chrome.storage.sync.get(
    {
      folderName: "Bookmarks Bar",
    },
    (items) => {
      document.getElementById("folderName").value = items.folderName;
    }
  );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
