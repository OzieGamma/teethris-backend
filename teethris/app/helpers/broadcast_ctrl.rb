require 'plezi'

# do you need automated redis support?
# require 'redis'
# ENV['PL_REDIS_URL'] = "redis://user:password@localhost:6379"

class BroadcastCtrl
  def index
    # we can use the websocket echo page to test our server,
    # just remember to update the server address in the form.
    redirect_to 'http://www.websocket.org/echo.html'
  end
  def on_message data
    # try replacing the following two lines are with:
    # self.class.broadcast :_send_message, data
    broadcast :_send_message, data
    response << "sent."
  end
  def _send_message data
    response << data
  end
end

route '/broadcast', BroadcastCtrl