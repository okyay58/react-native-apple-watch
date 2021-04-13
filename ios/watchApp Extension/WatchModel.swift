//
//  WatchModel.swift
//  watchApp Extension
//
//  Created by Medepia on 11.04.2021.
//

import Foundation
import WatchConnectivity

class WatchModel : NSObject,  WCSessionDelegate, ObservableObject{
  var session: WCSession
  @Published var message = ""
  
  init(session: WCSession = .default){
    self.session = session
    super.init()
    self.session.delegate = self
    session.activate()
  }
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
    DispatchQueue.main.async {
      self.message = message["message"] as? String ?? "Veri yok"
    }
  }
}
