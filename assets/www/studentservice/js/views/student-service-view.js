/*
 * Copyright (c) 2013, IT Services, Stockholm University
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of Stockholm University nor the names of its contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

suApp.view.StudentView = Backbone.View.extend({
  initialize: function () {

    $(document).on('deviceready.appview', this.handleDeviceReady);

    initLocale({ resGetPath: '../i18n/__lng__.json' });
    $('div[data-role="header"] > h1').attr('data-i18n', 'studentService.header.title');
    this.$el.i18n();

    var listLanguage = [];
    if (i18n.detectLanguage().indexOf("sv-") >= 0) {
      listLanguage = suApp.config.studentServiceSwe.menu;
    } else {
      listLanguage = suApp.config.studentServiceEng.menu;
    }

    this.menu = _.map(listLanguage, function (obj) {
      obj.title = i18n.t(obj.title);
      return obj;
    });

    this.menu = _.sortBy(this.menu, function (obj) {
      return obj.title;
    });
  },

  /**
   * Render the student service view.
   */
  render: function () {
    _.each(this.menu, function (obj) {
      $('#studentservice-menu').append(JST["studentservice/menu"](obj));
    });
    $("#studentservice-menu").listview('refresh');
  },

  events: {
    'click a.servicelink': 'handleServiceLinkClick',
    'click #studentservice-menu a': 'openChildBrowser' 
  },
  
  openChildBrowser: function(e) {
    e.preventDefault();
    var url = $(e.target).parent('a').attr('href');
    var inAppBrowser = window.open(url, '_blank', 'location=yes');
    inAppBrowser.addEventListener('loadstop', function() {
      inAppBrowser.insertCSS({code: ".head {display:none}"});
    });
    
//    inAppBrowser.addEventListener('loadstart', function() {
//      inAppBrowser.executeSript({code: ".head {display:none}"});
//    });

    return false;    
  },

  /**
   * Remove handler for the view.
   */
  remove: function () {
    $(document).off('.appview');

    Backbone.View.prototype.remove.call(this);
  },

  /**
   * Handles the device ready event.
   */
  handleDeviceReady: function () {
    gaPlugin.trackPage(null, null, "studentservice/index.html");
  },

  /**
   * Handles the device ready event.
   */
  handleServiceLinkClick: function (event) {
    gaPlugin.trackPage(null, null, $(event.target).attr("href"));
  }
});
