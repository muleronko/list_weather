(function ($) {
    $.fn.setWeather = function (city, move) {

        var link, temp_obj = {};
        city = city.split(',');
        var list = this.find('ul.list');
        var list_item = this.find('li.list_item');

        for (var items of city) {
            link = 'http://api.openweathermap.org/data/2.5/weather?q=' + items + '&APPID=bb74b05295dc8292c50a84bdb9b21964';
            $.ajax({
                url: link,
                async: false,
                success: function (data) {
                    temp_obj[items] = '<i class="material-icons">wb_sunny</i>' + Math.round(+data.main.temp - 273) + '<span>&deg</span>';
                }
            });
        }

        list_item.each(function () {
            for (var item of city) {
                var node = $(this);
                if (node.text().search(item) != -1) {
                    var weather = node.after('<span class="weather">' + temp_obj[item] + '</span>')
                }
            }
        });

        if (move == "up") {

            $(document).ready(function () {
                list_item.each(function () {
                    this.click(function () {
                        this.animate({
                            top: "10%",
                        }, 1500);
                        this.detach();
                        this.prepend(list);
                    });
                });
            });

        }
        if (move == "down") {

        }
    }
})(jQuery);
