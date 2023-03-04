function removeWorkoutEntry(value){
  const newWorkoutList = []
  const entries = localStorage.getItem("workout-tracker");
  const workoutList = JSON.parse("["+ entries + "]")
  for (let i= 0; i <= workoutList.length; i++) {
    if(workoutList[i]){
      if(workoutList[i].id == value){
		delete workoutList[i]
      }
    }
  }
  workoutList.forEach((data) => {
    if(data !== null || data !== undefined)
    newWorkoutList.push(data)
  })
      localStorage.setItem('workout-tracker',
	JSON.stringify(newWorkoutList).replace(/(\[|\])/gi,'')
      )
      renderWorkout()
}

function renderWorkout() {
  document.querySelector('#workout-list').innerHTML = ''
  const entries = localStorage.getItem("workout-tracker") || undefined;
  if (entries) {
    if(document.querySelector('#secondary-addBtn')){
	      document.querySelector('#secondary-addBtn').remove()
    }
    const workoutList = JSON.parse("["+ entries + "]")
    const current_day = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][new Date().getDay()] 
    
    const current_day_workoutList = []
    let current_day_groupKey

    workoutList.forEach((data)=>{
      if(data.day.replace(/.*-/gi,'') == current_day)
      current_day_workoutList.push(data); 
    })


    if(current_day_workoutList.length > 0){
    document.querySelector('#workout-list')
      .insertAdjacentHTML("beforeend",`
      		<div id="workout-list-today" class="border-b-2 border-red-600 pb-10">
		<span class="text-xl font-semibold text-gray-800 flex mt-4">
			Today's Workout
		</span>
		<table class="flex flex-col p-2 md:table md:w-full md:mt-3">
		<tr class="hidden md:table-row md:bg-blue-900
		md:text-white font-semibold text-xl ">
		  <th class="border-r-2 border-b-2">Day</th>
		  <th class="border-r-2 border-b-2">Exercise</th>
		  <th class="border-r-2 border-b-2">Machine</th>
		  <th class="border-r-2 border-b-2">Sets</th>
		  <th class="border-r-2 border-b-2">Reps</th>
		  <th class="border-r-2 border-b-2">Time</th>
		  <th class="border-r-2 border-b-2">Duration</th>
		  <th class="border-b-2">PR(Personal Record)</th>
		</tr>
		</table>
		</div>
	`)

    // Today's Workout
    current_day_workoutList.forEach((data) => {
    current_day_groupKey = data.groupKey
      document.querySelector('#workout-list-today > table')
      .insertAdjacentHTML("beforeend",`
		<tr class="md:table-row flex 
		flex-col p-2 mb-5 text-white 
		bg-gray-900 rounded-md relative">
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden ">Day:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.day.replace(/.*-/gi,'')}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Exercise:</span>
		  <span class="capitalize md:flex md:justify-center">
		    ${data.exercise}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Machine:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.isMAchine ? 'Yes' : 'No'}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Sets:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.sets}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Reps:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.reps}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Time:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${formatTime(data.workout_time)}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Duration:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.duration}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2 md:relative">
		  <span class="md:hidden">Personal Record(PR):</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.pr}
		  </span>
		  <button class="absolute top-0 right-0 
		  text-red-500 hover:text-red-700 text-xl translate-y-[-8px] translate-x-1 
		  md:translate-y-0 md:translate-x-0 md:mr-5
		  "
		  onclick="removeWorkoutEntry('${data.id}')"
		  >
		  	<i class="fa-solid fa-circle-xmark"></i>
		  </button>
		  </td>
		</tr>
	`)

    })
  }


    const serealized_workoutList = []
    for (let i = 1; i <= 7; i++) {
      workoutList.forEach((data) => {
	if(data.groupKey == i)
	  serealized_workoutList.push(data)
      })
    }

    document.querySelector('#workout-list')
      .insertAdjacentHTML("beforeend",`
      		<div id="workout-list-rest">
		<span class="text-xl font-semibold text-gray-800 flex mt-4">
			 Workouts
		</span>
		<table class="flex flex-col p-2 md:table md:w-full md:mt-3">
		<tr class="hidden md:table-row md:bg-green-900
		md:text-white font-semibold text-xl ">
		  <th class="border-r-2 border-b-2">Day</th>
		  <th class="border-r-2 border-b-2">Exercise</th>
		  <th class="border-r-2 border-b-2">Machine</th>
		  <th class="border-r-2 border-b-2">Sets</th>
		  <th class="border-r-2 border-b-2">Reps</th>
		  <th class="border-r-2 border-b-2">Time</th>
		  <th class="border-r-2 border-b-2">Duration</th>
		  <th class="border-b-2">PR(Personal Record)</th>
		</tr>
		</table>
		</div>
	`)

    // All Workouts in Serial
    serealized_workoutList.forEach((data) => {
      if(data.groupKey !== current_day_groupKey)
	document.querySelector('#workout-list-rest > table')
      	.insertAdjacentHTML("beforeend",
	  `
		<tr class="md:table-row flex 
		flex-col p-2 mb-5 text-white 
		bg-[#112416] rounded-md relative">
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Day:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.day.replace(/.*-/gi,'')}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Exercise:</span>
		  <span class="capitalize md:flex md:justify-center">
		    ${data.exercise}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Machine:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.isMAchine ? 'Yes' : 'No'}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Sets:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.sets}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Reps:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.reps}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Time:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${formatTime(data.workout_time)}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2">
		  <span class="md:hidden">Duration:</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.duration}
		  </span>
		  </td>
		  <td class="md:border-b-2 md:border-r-2 md:relative">
		  <span class="md:hidden">Personal Record(PR):</span>
		  <span class="capitalize md:flex md:justify-center">
		  ${data.pr}
		  </span>
		  <button class="absolute top-0 right-0 
		  text-red-500 hover:text-red-700 text-xl translate-y-[-8px] translate-x-1 
		  md:translate-y-0 md:translate-x-0 md:mr-5
		  "
		  onclick="removeWorkoutEntry('${data.id}')"
		  >
		  	<i class="fa-solid fa-circle-xmark"></i>
		  </button>
		  </td>
		</tr>
	  `  
	)
    })

  } else {
    document.querySelector("#workout-list").insertAdjacentHTML(
      "beforeend",
      `
    <div class="pt-6 flex justify-center " id="secondary-addBtn">
	<button class="bg-gray-900 p-2 pl-4 pr-4 text-gray-300 rounded-lg"
	onclick="workoutEntryModel()"
	>
		Add Workout
    	</button>
    </div>
      `
    );
  }
}

function removeWorkoutEntryForm() {
  document.querySelector("#workout-entry-form").remove();
}

function saveWorkout(data){
  	const entries  = []	
 	const savedData = [localStorage.getItem('workout-tracker')] 
  
  	if(savedData.toString().length !== 0) {
		entries.push(savedData.toString(),data)
	} else {
	  	entries.push(data)
	}

	localStorage.setItem('workout-tracker',  entries.toString() )
}

function workoutEntryModel() {
  document.querySelector("body").insertAdjacentHTML(
    "beforeend",
    `
    <div
      class="absolute w-screen h-screen bg-black/80 flex justify-center items-start pt-5 md:pt-0 md:items-center top-0 left-0"
      id="workout-entry-form"
    >
      <div class="p-2 bg-white rounded-md relative w-[300px]">
        <button
          class="absolute top-0 right-0 text-red-600 hover:text-red-900 translate-x-1 translate-y-[-5px] focus:ouline-none text-2xl rounded-full flex justify-end"
          onclick="removeWorkoutEntryForm()"
        >
          <i class="fa-solid fa-circle-xmark"></i>
        </button>

        <form id="workoutForm" class="flex flex-col space-y-3">
          <span class="text-xl font-semibold text-gray-800"> Select Day </span>

          <select name="workout_day" class="p-2 text-lg font-semibold text-gray-700 rounded-md bg-gray-300">
            <option value="1-monday">Monday</option>
            <option value="2-tuesday">Tuesday</option>
            <option value="3-wednesday">Wednesday</option>
            <option value="4-thursday">Thursday</option>
            <option value="5-friday">Friday</option>
            <option value="6-saturday">Saturday</option>
            <option value="7-sunday">Sunday</option>
          </select>

          <span class="text-xl font-semibold text-gray-800">
            Select Exercise
          </span>

          <select name="workout_exercise"  class="p-2 text-lg font-semibold text-gray-700 rounded-md bg-gray-300" >
            <optgroup label="Cardiovascular exercises">
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
              <option value="swimming">Swimming</option>
              <option value="jumping-jacks">Jumping jacks</option>
              <option value="high-knees">High knees</option>
              <option value="burpees">Burpees</option>
            </optgroup>
            <optgroup label="Strength training exercises">
              <option value="squats">Squats</option>
              <option value="deadlifts">Deadlifts</option>
              <option value="bench-press">Bench press</option>
              <option value="shoulder-press">Shoulder press</option>
              <option value="pull-ups">Pull-ups</option>
              <option value="push-ups">Push-ups</option>
              <option value="bicep-curls">Bicep curls</option>
              <option value="tricep-dips">Tricep dips</option>
              <option value="lunges">Lunges</option>
              <option value="leg-press">Leg press</option>
              <option value="leg-extensions">Leg extensions</option>
              <option value="leg-curls">Leg curls</option>
              <option value="calf-raises">Calf raises</option>
              <option value="lat-pulldowns">Lat pulldowns</option>
              <option value="seated-rows">Seated rows</option>
              <option value="barbell-rows">Barbell rows</option>
              <option value="dumbbell-rows">Dumbbell rows</option>
              <option value="chest-flys">Chest flys</option>
              <option value="cable-curls">Cable curls</option>
              <option value="cable-tricep-extensions">
                Cable tricep extensions
              </option>
              <option value="barbell-curls">Barbell curls</option>
              <option value="skull-crushers">Skull crushers</option>
              <option value="overhead-tricep-extensions">
                Overhead tricep extensions
              </option>
              <option value="farmers-carry">Farmers carry</option>
              <option value="planks">Planks</option>
              <option value="russian-twists">Russian twists</option>
              <option value="ab-wheel-rollouts">Ab wheel rollouts</option>
              <option value="cable-wood-chops">Cable wood chops</option>
              <option value="medicine-ball-slams">Medicine ball slams</option>
              <option value="box-jumps">Box jumps</option>
            </optgroup>
            <optgroup label="Flexibility exercises">
              <option value="stretching">Stretching</option>
              <option value="yoga">Yoga</option>
              <option value="pilates">Pilates</option>
              <option value="tai-chi">Tai chi</option>
            </optgroup>
            <optgroup label="Important">
              <option value="rest">Rest</option>
            </optgroup>
          </select>

          <span class="text-xl font-semibold text-gray-800">
            Machine
            <input type="checkbox" name="workout_machine" />
          </span>

          <span class="text-xl font-semibold text-gray-800"> Enter Sets </span>

          <input type="number" name="workout_sets" required  class="p-1 text-md font-semibold text-gray-700 rounded-md bg-gray-300"/>

          <span class="text-xl font-semibold text-gray-800"> Enter Reps </span>

          <input type="number" name="workout_reps" required  class="p-1 text-md font-semibold text-gray-700 rounded-md bg-gray-300"/>

          <span class="text-xl font-semibold text-gray-800">
            Workout Time
          </span>

          <input type="time" name="workout_time" required  class="p-1 text-md font-semibold text-gray-700 rounded-md bg-gray-300"/>

          <span class="text-xl font-semibold text-gray-800">
            Workout Duration(in min)
          </span>

          <input type="number" name="workout_duration" required  class="p-1 text-md font-semibold text-gray-700 rounded-md bg-gray-300"/>

          <span class="text-xl font-semibold text-gray-800">
            PR(Personal Record)
          </span>

          <input type="text" name="workout_pr" required  class="p-1 text-md font-semibold text-gray-700 rounded-md bg-gray-300"/>

          <button
            type="submit"
            class="bg-gray-900 p-2 text-gray-300 rounded-lg"
          >
            Save
          </button>
        </form>
      </div>
    </div>
      `
  );

const form = document.forms.workoutForm
form.addEventListener('submit',function(event){
  	event.preventDefault()
  	
  	const data = {
	  	id: crypto.randomUUID().replaceAll('-',''),
	  	groupKey: form.workout_day.value.replace(/-.*/gi,''),
		day: form.workout_day.value,
	  	exercise: form.workout_exercise.value,
	  	isMAchine: form.workout_machine.checked,
	  	sets: form.workout_sets.value,
	  	reps: form.workout_reps.value,
	  	workout_time: form.workout_time.value,
	  	duration: form.workout_duration.value,
	  	pr: form.workout_pr.value
  	}	 
  	saveWorkout(JSON.stringify(data))
  	removeWorkoutEntryForm()
  	renderWorkout()
})

}

function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

window.onload = function () {
  renderWorkout();
};
