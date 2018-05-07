<?php
if (count($_POST) > 0) {
  header('Content-Type: text/plain; charset=utf-8');
  header('HTTP/1.1 200 OK');

  echo str_repeat('=', 80) . "\n";

  foreach ($_SERVER as $key => $value) {
    if (preg_match("/^HTTP_/", $key)) {
      echo "$key\t$value\n";
    }
  }

  foreach ($_POST as $key => $value) {
    echo "$key\t$value\n";
  }

  echo str_repeat('=', 80) . "\n";

  exit;
}
?>
<!doctype html>

<html>
  <head>
    <title>ReSpammer Test</title>
    <meta charset="utf-8" />
  </head>

  <body>
      <form action="/index.php" method="post">
        <fieldset>
          <legend>Account Info</legend>
          <p><input type="text" name="account" value="" /></p>
          <p><input type="password" name="password" value="" /></p>
          <p><button type="submit">Submit</button></p>
        </fieldset>
      </form>
  </body>
</html>