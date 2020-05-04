const increase = (counter) => counter + 1;

fromAll()
    .when({
      $init: function () {
        return {
          count: 0
        }
      },
      ApplicantInvited: function (s, e) {
        s.count = increase(s.count);
      }
    })
