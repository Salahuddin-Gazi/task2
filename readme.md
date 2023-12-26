# Task2

Task 2: You are working on a dashboard using ReactJS and Tailwind CSS. The dashboard displays data charts which are fetched from a REST API. However, the charts are not updating in real-time as new data arrives from the API.

**Solutions:**
For this task, I have come up with the idea of - "It will be a monthly revenue previewer app".

It will simply show bar charts of the revenue percentage of every month like:

- January - 87%
- February - 65%
- upto December

## Backend

Used express js as the backend or as REST API framework with SQLite3 for the database.
**Features**

1.  It has a web(table) preview of the current data.
2.  From the web preview user can update the revenue percentage.

## Front-End

Used React JS and Parcel as the bundler.
**Features**

1.  It will only shows the bar charts.
2.  It will collect data directly from the REST API.

## Guide

**Install packages**

1.  Install root package

```
npm install
```

2.  Install sub packages

```
npm run package
```

**Start the project**

```
npm start
```

**To access backend data table**

```
http://127.0.0.1:5432
```

**To access frontend**

```
http://127.0.0.1:1234
```

### Additionals

Added a video, to easily understand how this project work.

[![Watch the video](./thumbnail.png)](./task_2.mkv)
