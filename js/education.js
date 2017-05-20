$(function(){

  $('.report-card.treehouse').reportCard({
      userName: 'milesaylward',
      site: 'treehouse',
      badgesAmount: 7
  });
  $('.education-list li').on('click', event => {
    let $this = event.target.id;

    switch ($this) {
      case 'treehouseBTN':
        $('.udemy-container').slideUp(700);
        $('.fcc-container').slideUp(700);
        $('.report-card.treehouse').delay(800).slideDown(1000);
        break;
      case 'fccBTN':
        $('.udemy-container').slideUp(700);
        $('.report-card.treehouse').slideUp(700);
        $('.fcc-container').delay(800).slideDown(1000);
        break;
      case 'udemyBTN':
        $('.fcc-container').slideUp(700);
        $('.report-card.treehouse').slideUp(700);
        $('.udemy-container').delay(800).slideDown(1000);
        break;
    }
  });
});
