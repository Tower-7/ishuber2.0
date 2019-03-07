# ishuber2.0项目部署
##### 一、全部命令
 ```
 yum install -y git &&\
mkdir -p /config && \
cd /config && \
git clone https://github.com/Tower-7/docker.git && \
cd docker && \
python setupDockerCompose.py && \
cd /config && \
git clone https://github.com/Tower-7/mongo.git && \
cd mongo && \
python setupMongo.py && \
mkdir -p /home/wwwroot/ && \
cd /home/wwwroot/ && \
git clone https://github.com/Tower-7/node.git && \
cd /home/wwwroot/node && \
git clone https://github.com/Tower-7/ishuber2.0.git && \
mv ishuber2.0 web && \
cd /home/wwwroot/node && \ 
docker-compose build && \
docker-compose up -d
```

##### 二、分步安装

 1、[安装docker](https://github.com/Tower-7/docker/blob/master/README.md)

