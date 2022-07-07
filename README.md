
# Weather Dashboard

This is a weather dashboard created for users to check the temperature, humidity, wind speed, UVI, sunrise, & sunset of any city within the U.S. It features dynamic HTML and CSS. I've used localStorage to store persistent data. 

# Technologies

- HTML
- CSS
- JavaScript
- Jquery
- Moment.js

# Deployed Link and URL

- https://priyarizal.github.io/weekly-planning/
- https://github.com/priyarizal/weekly-planning

# Significant Code Snippets

LocalStorage

````$('.saveBtn').on('click', function(event) {

    var key =$(this).siblings("textarea").attr("id")
    var value =$(this).siblings("textarea").val()

    localStorage.setItem(key, value);

```$('#9').val(localStorage.getItem('9'));
// $('#10').val(localStorage.getItem('10'));

```$("textarea").each(function() {
 ```$(this).val(localStorage.getItem($(this).attr("id")))

````

# Screen Shots for Design Highlight

![dailycalender](./assets/1.png)
![dailycalender](./assets/2.png)

# Gif for Demoing Functionality

![dailycalender](./assets/Work%20Day%20Scheduler.gif)

# Contributors

- UCB bootcamp instructor : Jerome Channete

- Sean New (tutor)
- Jehyun Jung (tutor)

# Contact Me

- www.linkedin.com/in/priya-r-822271110
- https://github.com/priyarizal

# License

- MIT
