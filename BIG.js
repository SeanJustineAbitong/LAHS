var prompts = [
  {
    prompt: "I find it difficult to introduce myself to people",
    weight: -1,
    class: "group0",
  },
  {
    prompt: "I get so lost in my thoughts I ignore or forget my surroundings",
    weight: -1,
    class: "group1",
  },
  {
    prompt: "I do not usually initiate conversations",
    weight: -1,
    class: "group2",
  },
  {
    prompt: "I prefer not to engage with people who seem angry or upset",
    weight: -1,
    class: "group3",
  },
  {
    prompt: "I choose my friends carefully",
    weight: -1,
    class: "group4",
  },
  {
    prompt: "I find it difficult to tell stories about myself",
    weight: -1,
    class: "group5",
  },
  {
    prompt: "I am usually highly motivated and energetic",
    weight: 1,
    class: "group6",
  },
  {
    prompt:
      "I find it easy to walk up to a group of people and join in conversation",
    weight: 1,
    class: "group7",
  },
  {
    prompt: "Being adaptable is more important than being organized",
    weight: 1,
    class: "group8",
  },
  {
    prompt:
      "I care more about making sure no one gets upset than winning a debate",
    weight: 1,
    class: "group9",
  },
  {
    prompt: "I often do not feel I have to justify myself to people",
    weight: 1,
    class: "group10",
  },
  {
    prompt:
      "I would rather improvise than spend time coming up with a detailed plan",
    weight: 1,
    class: "group11",
  },
];

var prompt_values = [
  {
    value: "Strongly Agree",
    class: "btn-default btn-strongly-agree",
    weight: 5,
  },
  {
    value: "Agree",
    class: "btn-default btn-agree",
    weight: 3,
  },
  {
    value: "Neutral",
    class: "btn-default",
    weight: 0,
  },
  {
    value: "Disagree",
    class: "btn-default btn-disagree",
    weight: -3,
  },
  {
    value: "Strongly Disagree",
    class: "btn-default btn-strongly-disagree",
    weight: -5,
  },
];

function createPromptItems() {
  for (var i = 0; i < prompts.length; i++) {
    var prompt_li = document.createElement("li");
    var prompt_p = document.createElement("p");
    var prompt_text = document.createTextNode(prompts[i].prompt);

    prompt_li.setAttribute("class", "list-group-item prompt");
    prompt_p.appendChild(prompt_text);
    prompt_li.appendChild(prompt_p);

    document.getElementById("quiz").appendChild(prompt_li);
  }
}

function createValueButtons() {
  for (var li_index = 0; li_index < prompts.length; li_index++) {
    var group = document.createElement("div");
    group.className = "btn-group btn-group-justified";

    for (var i = 0; i < prompt_values.length; i++) {
      var btn_group = document.createElement("div");
      btn_group.className = "btn-group";

      var button = document.createElement("button");
      var button_text = document.createTextNode(prompt_values[i].value);
      button.className =
        "group" + li_index + " value-btn btn " + prompt_values[i].class;
      button.appendChild(button_text);

      btn_group.appendChild(button);
      group.appendChild(btn_group);

      document.getElementsByClassName("prompt")[li_index].appendChild(group);
    }
  }
}

createPromptItems();
createValueButtons();

var total = 0;

function findPromptWeight(prompts, group) {
  var weight = 0;

  for (var i = 0; i < prompts.length; i++) {
    if (prompts[i].class === group) {
      weight = prompts[i].weight;
    }
  }

  return weight;
}

function findValueWeight(values, value) {
  var weight = 0;

  for (var i = 0; i < values.length; i++) {
    if (values[i].value === value) {
      weight = values[i].weight;
    }
  }

  return weight;
}

$(".value-btn").mousedown(function () {
  var classList = $(this).attr("class");
  // console.log(classList);
  var classArr = classList.split(" ");
  // console.log(classArr);
  var this_group = classArr[0];
  // console.log(this_group);

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    total -=
      findPromptWeight(prompts, this_group) *
      findValueWeight(prompt_values, $(this).text());
  } else {
    total -=
      findPromptWeight(prompts, this_group) *
      findValueWeight(prompt_values, $("." + this_group + ".active").text());

    $("." + this_group).removeClass("active");

    $(this).addClass("active");
    total +=
      findPromptWeight(prompts, this_group) *
      findValueWeight(prompt_values, $(this).text());
  }

  console.log(total);
});

$("#submit-btn").click(function () {
  $(".results").removeClass("hide");
  $(".results").addClass("show");

  if (total < 0) {
    document.getElementById("results").innerHTML =
      "<b>You are introverted!</b><br><br>\
            Introverts are tricky to understand, since it’s so easy for us to assume that introversion is the same as being shy, when, in fact, introverts are simply people who find it tiring to be around other people.\n\
    <br><br>\
    I love this explanation of an introvert’s need to be alone:\n\
    <br><br>\
    For introverts, to be alone with our thoughts is as restorative as sleeping, as nourishing as eating.\n\n\
    <br><br>\
    Introverted people are known for thinking things through before they speak, enjoying small, close groups of friends and one-on-one time, needing time alone to recharge, and being upset by unexpected changes or last-minute surprises. Introverts are not necessarily shy and may not even avoid social situations, but they will definitely need some time alone or just with close friends or family after spending time in a big crowd.\
            ";
  } else if (total > 0) {
    document.getElementById("results").innerHTML =
      "<b>You are extroverted!</b><br><br>\
            On the opposite side of the coin, people who are extroverted are energized by people. They usually enjoy spending time with others, as this is how they recharge from time spent alone focusing or working hard.\
    <br><br>\
    I like how this extrovert explains the way he/she gains energy from being around other people:\
    <br><br>\
    When I am among people, I make eye contact, smile, maybe chat if there’s an opportunity (like being stuck in a long grocery store line). As an extrovert, that’s a small ‘ping’ of energy, a little positive moment in the day.";
  } else {
    document.getElementById("results").innerHTML =
      "<b>You are ambiverted!</b><br><br>\
            Since introverts and extroverts are the extremes of the scale, the rest of us fall somewhere in the middle. Many of us lean one way or the other, but there are some who are quite balanced between the two tendencies. These people are called ambiverts.\
    <br><br>\
    Take a look at how an ambivert compares.\
    <br><br>\
    Ambiverts exhibit both extroverted and introverted tendencies. This means that they generally enjoy being around people, but after a long time this will start to drain them. Similarly, they enjoy solitude and quiet, but not for too long. Ambiverts recharge their energy levels with a mixture of social interaction and alone time.";
  }

  $("#quiz").addClass("hide");
  $("#submit-btn").addClass("hide");
  $("#retake-btn").removeClass("hide");
});

$("#retake-btn").click(function () {
  $("#quiz").removeClass("hide");
  $("#submit-btn").removeClass("hide");
  $("#retake-btn").addClass("hide");

  $(".results").addClass("hide");
  $(".results").removeClass("show");
});
