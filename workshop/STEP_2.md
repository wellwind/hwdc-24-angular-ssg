# Prerender 進階設定

1. 將 `angular.json` 中的

   ```json
   "prerender": true,
   ```

   改成

   ```json
   "prerender": {
     "routesFile": "routes.txt"
   },
   ```

2. 在專案根目錄建立 `routes.txt` 檔案，內容如下

   ```txt
   hello-world
   second-post
   ```

3. 重新執行 `npm run build`

4. 在 `dist/hwdc24-angular-ssg/browser` 目錄中，可以額外看到 `hello-world/index.html` 以及 `second-post/index.html` 兩個靜態產生的網站，一樣可以開個測試伺服器觀察產出效果

   ```bash
   npx http-server dist/hwdc-24-angular-ssg/browser/
   ```

5. 建立 `public/content/third-post/third-post.md` 檔案

   ```markdown
   ---
   title: "Third Post"
   date: "2024-09-11 11:00:00"
   ---

   This is the third post.

   <!-- more -->

   Hello World!!
   ```

6. 在 `public/content/content-list.json` 中，新增 `third-post` 的資料

   ```json
   {
     "slug": "third-post",
     "title": "Third Post",
     "date": "2024-09-11 11:00:00",
     "summary": "<p>This is the third post.</p>\n"
   }
   ```

7. 在 `routes.txt` 中，新增一筆 `third-post` 的路由

   ```txt
   third-post
   ```

8. 重新執行 `npm run build`

9. 在 `dist/hwdc24-angular-ssg/browser` 目錄中，可以額外看到 `third-post/index.html` 靜態產生的網站，觀察靜態網站效果

   ```bash
   npx http-server dist/hwdc-24-angular-ssg/browser/
   ```

