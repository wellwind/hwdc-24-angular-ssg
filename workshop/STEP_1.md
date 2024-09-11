# Static Site 快速體驗

1. 直接開啟瀏覽器瀏覽 `http://localhost:4200`

2. 在瀏覽器中檢視原始碼，此時可以看到 Server Side Rendering 的效果

3. 移除 Server Side Rendering 的相關設定

    在 `angular.json` 中，找到以下程式片段，將它們移除

    ```json
    "server": "src/main.server.ts",
    "prerender": true,
    "ssr": {
      "entry": "server.ts"
    }
    ```

4. 重新啟動專案，並在瀏覽器中檢視原始碼，此時可以看到 Server Side Rendering 的效果消失了

5. 將移除的設定加回來，之後執行 `npm run build` 將專案編譯成靜態檔案

6. 在 `dist/hwdc24-angular-ssg/browser` 目錄中，可以看到編譯後的靜態檔案，包含 `index.html` 以及 `about/index.html` 兩個靜態產生的網站；此時不會將 content 資料夾中的 markdown 產出成靜態內容

7. 可以用一個簡單的 Web Server 來檢視 `dist/hwdc24-angular-ssg/browser` 目錄中的靜態檔案

   ```bash
   npx http-server dist/hwdc-24-angular-ssg/browser/
   ```
