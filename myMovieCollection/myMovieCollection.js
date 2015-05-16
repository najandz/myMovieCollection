var Movies = new Meteor.Collection("movies");

var editMode = false;
var selectedMovie = '';
if (Meteor.isClient) {



	Template.newMovie.rendered = function() {
		$('.movie_form').hide();
	}


	Template.newMovie.events({



		'click .new_movie': function() {
			$("input[type='text']").val('');
			$('#movie_genre').get(0).selectedIndex = 0;
			$('.movie_form').toggle();
		},
		'click .movie_submit': function(e) {

			if (editMode === false) {
				Movies.insert({
					title: $('.movie_title').val(),
					releaseYear: $('.movie_year').val(),
					genre: $('#movie_genre :selected').text()
				});

			} else {

				Movies.update(selectedMovie, {
					$set: {
						title: $('.movie_title').val(),
						releaseYear: $('.movie_year').val(),
						genre: $('#movie_genre :selected').text()

					}
				});

			}
			$("input[type='text']").val('');
			$('#movie_genre').get(0).selectedIndex = 0;
		}
	});
	Template.movies.movies = function() {
		return Movies.find({});
	};


var Genres = ['ALL',
              'Action', 'Animation', 'Comedy', 'Documentary','Family'];

Template.dropdownGenre.genres = function() {
  return Genres;
};



	Template.movies.events({
		'click .delete': function(e) {
			e.preventDefault();

			Movies.remove(this._id);
		},
		'click .edit': function(e) {
			selectedMovie = this._id;
			editMode = true;
			$('.movie_form').show();
			$('.movie_title').val(this.title);
			$('.movie_year').val(this.releaseYear);
			$('.movie_genre').val(this.genre);
		}
	});

  Template.login.events({
      'click #facebook-login': function(event) {
          Meteor.loginWithFacebook({}, function(err){
              if (err) {
                  throw new Meteor.Error("Facebook login failed");
              }
          });
      },

      'click #logout': function(event) {
          Meteor.logout(function(err){
              if (err) {
                  throw new Meteor.Error("Logout failed");
              }
          })
      }
  });



}


if (Meteor.isServer) {

}
