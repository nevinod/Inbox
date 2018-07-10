pragma solidity ^0.4.17;

contract Inbox {
  string public message;
  string public tempMessage;

  function Inbox(string initialMessage) public {
    message = initialMessage;
  }

  function setMessage(string newMessage) public {
    message = newMessage;
  }
}
