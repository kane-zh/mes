1.安装nginx
  sudo apt-get install nginx
2.配置nginx
   gedit   /etc/nginx/sites-enabled/default
   server {
        listen       80;
        server_name  mes_client;

        location / {
            root /usr/local/vue/dist;
            try_files $uri $uri/ @router;
            index index.html;
            add_header Cache-Control no-cache;
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
            root html;
        }
        location @router {
            rewrite ^.*$ /index.html last;
        }
    }
3.启动nginx        (---非必须)
	sudo /usr/sbin/nginx
		{
		停止:sudo /usr/sbin/nginx -s stop
		重启:sudo /usr/sbin/nginx -s reload
		}

4.修改  dist/static/basicConfig.json
      {
       "BASE_URL": "http://39.105.148.227:8000"   # 将地址改成mes_server服务地址
      }


5.将 dist文件夹放置 nginx配置的位置
    location /
    {
       root /usr/local/vue/dist;
       try_files $uri $uri/ @router;
       index index.html;
       add_header Cache-Control no-cache;
    }


