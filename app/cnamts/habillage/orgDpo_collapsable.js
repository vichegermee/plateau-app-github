var config = {
  container : "#collapsable-chart",
  animateOnInit : true,
  animateOnInitDelay:100,
  levelSeparation : 90,
  connectors : {
    type : 'curve'
  },
  node : {
    collapsable : true,
    drawLineThrough : false,

  },
  animation : {
    nodeAnimation : "linear",
    nodeSpeed : 700,
    connectorsSpeed : 700
  }
};
// Définition de chaque noued avec ses différentes propriétés
pierre_tinet = {
    HTMLclass: 'blue',
  text : {
    name : "Pierre Tinet",
    title : "Direction pole ouest",
  }
};
eric_roussille = {
  parent : pierre_tinet,
  HTMLclass: 'blue',
  text : {
    name : "Eric Roussille",
    title : "Direction pole ouest-Fabrication"
  }
};
alain_marchand = {
  parent : eric_roussille,
  HTMLclass: 'blue',
  text : {
    name : "Alain Le Marchand",
    title : "Domaine Bénéficiares"
  }
};
gerard_Pepion = {
  parent : eric_roussille,
  HTMLclass: 'blue',
  childrenDropLevel : 1,
  text : {
    name : "Gérard Pepion",
    title : "Programme 1"
  }

};
olivier_robien = {
  parent : eric_roussille,
  HTMLclass: 'blue',
  text : {
    name : "Olivier De Robien",
    title : "Programme 2-Espace Pro"
  }

};
// Création d'un noued invisble pouvant contenir des noueds enfants
pseudo1 = {
  parent : eric_roussille,
  pseudo : true
};
pseudo2 = {
  parent : eric_roussille,
  pseudo : true
};
cecile_palard = {
  parent : pseudo1,
  HTMLclass: 'blue',
  text : {
    name : "Cécile Palard-Fabien",
    title : "Domaine référentiels et produits médicaux"
  }

};
tristan_besnier = {
  parent : pseudo2,
  HTMLclass: 'blue',
  text : {
    name : "Tristan Besnier ",
    title : "produits à SLA"
  }
};

chart_config = [ config, pierre_tinet, eric_roussille,
    alain_marchand, pseudo1, gerard_Pepion, pseudo2,
    olivier_robien,tristan_besnier, cecile_palard  ];
