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

describe('inAppBrowser', function () {

  describe('Open function', function () {
    beforeEach(function () {
      spyOn(window, "open").andCallThrough();
      spyOn(window.plugins.gaPlugin, 'trackPage');
      spyOn(window.plugins.inAppBrowser, 'addEventListener');

      inAppBrowser.open("url", "title");
    });

    it('should call window open', function () {
      var rootPath = window.location.href.substring(0, window.location.href.indexOf('www') + 3);
      expect(window.open).toHaveBeenCalledWith(rootPath + '/in-app-browser.html', '_blank', 'location=no');
    });

    it('should track opened page', function () {
      expect(window.plugins.gaPlugin.trackPage).toHaveBeenCalledWith(null, null, 'url');
    });

    it('should add event listeners', function () {
      expect(window.plugins.inAppBrowser.addEventListener.calls.length).toEqual(3);
      expect(window.plugins.inAppBrowser.addEventListener.calls[0].args[0]).toEqual("loadstop");
      expect(window.plugins.inAppBrowser.addEventListener.calls[1].args[0]).toEqual("loadstart");
      expect(window.plugins.inAppBrowser.addEventListener.calls[2].args[0]).toEqual("exit");
    });
  });

});