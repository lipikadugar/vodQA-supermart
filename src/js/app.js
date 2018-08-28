App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load items.
    $.getJSON('../super_mart.json', function(data) {
      var itemsRow = $('#itemsRow');
      var itemTemplate = $('#itemTemplate');

      for (i = 0; i < data.length; i ++) {
        itemTemplate.find('.panel-title').text(data[i].name);
        itemTemplate.find('img').attr('src', data[i].picture);
        itemTemplate.find('.item-rating').text(data[i].rating);
        itemTemplate.find('.item-price').text(data[i].price);
        itemTemplate.find('.item-brand').text(data[i].brand);
        itemTemplate.find('.btn-buy').attr('data-id', data[i].id);

        itemsRow.append(itemTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Purchase.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var PurchaseArtifact = data;
      App.contracts.Purchase = TruffleContract(PurchaseArtifact);

      // Set the provider for our contract
      App.contracts.Purchase.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the purchased items
      return App.markPurchased();
    });


    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handlePurchase);
  },

  markPurchased: function(buyers, account) {
    var purchaseInstance;

    App.contracts.Purchase.deployed().then(function(instance) {
      purchaseInstance = instance;

      return purchaseInstance.getBuyers.call();
    }).then(function(buyers) {
      for (i = 0; i < buyers.length; i++) {
        if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-item').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handlePurchase: function(event) {
    event.preventDefault();

    var itemId = parseInt($(event.target).data('id'));
var purchaseInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Purchase.deployed().then(function(instance) {
    purchaseInstance = instance;

    // Execute purchase as a transaction by sending account
    return purchaseInstance.buy(itemId, {from: account});
  }).then(function(result) {
    return App.markPurchased();
  }).catch(function(err) {
    console.log(err.message);
  });
});
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
