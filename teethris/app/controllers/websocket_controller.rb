class WebsocketController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def request_game
    # Insert Zo�'s code
  end
end